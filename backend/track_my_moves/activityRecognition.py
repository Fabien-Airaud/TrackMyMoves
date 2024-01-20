import os
import pandas as pd

DATASET_PATH = "static/track_my_moves/dataset"

class ImportationDataset:
    def lire_fichier(self, path):
        return pd.read_csv(path, delim_whitespace=True, header=None)
    
    def charger_donnees(self, chemin, type = "train"):
        donnees_brutes = self.lire_fichier(os.path.join(chemin, f"x_{type}.txt"))
        annotations = self.lire_fichier(os.path.join(chemin, f"y_{type}.txt"))
        y = annotations.values.ravel()
        return donnees_brutes, y
    
    def charger_donnees_entrainement(self):                                        
        chemin_train = os.path.join(DATASET_PATH, "train")
        return self.charger_donnees(chemin_train, "train")

    def charger_donnees_test(self):
        chemin_test = os.path.join(DATASET_PATH, "test")
        return self.charger_donnees(chemin_test, "test")


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

import numpy as np
from scipy.stats import entropy, mode, skew, kurtosis 
from pyts.transformation import BagOfPatterns, BOSS

class ExtractionCaracteristiquesDataset:
    def __init__(self, donnees_brutes_train, donnees_brutes_test):
        self.donnees_brutes_train = donnees_brutes_train
        self.donnees_brutes_test = donnees_brutes_test

    def entropie(self, signal):
        histogramme = np.histogram(signal, bins=100)[0]
        histogramme = histogramme / np.sum(histogramme)
        return entropy(histogramme)
    
    def frequence_moyenne(self, signal):
        frequence_amplitude = np.abs(np.fft.fft(signal))
        freqs = np.fft.fftfreq(len(signal))
        return np.average(freqs, weights=frequence_amplitude)

    def extraction_metriques_stat(self):                # Fonction qui permet d'extraire les métriques statistiques
        moyenne = np.mean(self.donnees_brutes_train, axis=1)
        maximum = np.max(self.donnees_brutes_train, axis=1)
        minimum = np.min(self.donnees_brutes_train, axis=1)
        variance = np.var(self.donnees_brutes_train, axis=1)
        ecart_type = np.std(self.donnees_brutes_train, axis=1)
        mediane = np.median(self.donnees_brutes_train, axis=1)
        sma = np.sum(np.abs(self.donnees_brutes_train), axis=1)
        energie = np.sum(self.donnees_brutes_train**2, axis=1)
        iqr = np.percentile(self.donnees_brutes_train, 75, axis=1) - np.percentile(self.donnees_brutes_train, 25, axis=1)
        entropie_valeurs = np.apply_along_axis(self.entropie, 1, self.donnees_brutes_train)
        indices_max_freq = np.argmax(np.abs(np.fft.fft(self.donnees_brutes_train)), axis=1)
        frequences_moyennes = np.apply_along_axis(self.frequence_moyenne, 1, self.donnees_brutes_train)
        mode_valeurs = mode(self.donnees_brutes_train, axis=1)[0]
        skew_valeurs = skew(self.donnees_brutes_train, axis=1)
        kurtosis_valeurs = kurtosis(self.donnees_brutes_train, axis=1)

        x_train_features = np.column_stack((moyenne, maximum, minimum, variance, ecart_type, mediane, sma, energie, iqr, entropie_valeurs, indices_max_freq, frequences_moyennes, mode_valeurs, skew_valeurs, kurtosis_valeurs))

        moyenne_test = np.mean(self.donnees_brutes_test, axis=1)
        maximum_test = np.max(self.donnees_brutes_test, axis=1)
        minimum_test = np.min(self.donnees_brutes_test, axis=1)
        variance_test = np.var(self.donnees_brutes_test, axis=1)
        ecart_type_test = np.std(self.donnees_brutes_test, axis=1)
        mediane_test = np.median(self.donnees_brutes_test, axis=1)
        sma_test = np.sum(np.abs(self.donnees_brutes_test), axis=1)
        energie_test = np.sum(self.donnees_brutes_test**2, axis=1)
        iqr_test = np.percentile(self.donnees_brutes_test, 75, axis=1) - np.percentile(self.donnees_brutes_test, 25, axis=1)
        entropie_valeurs_test = np.apply_along_axis(self.entropie, 1, self.donnees_brutes_test)
        indices_max_freq_test = np.argmax(np.abs(np.fft.fft(self.donnees_brutes_test)), axis=1)
        frequences_moyennes_test = np.apply_along_axis(self.frequence_moyenne, 1, self.donnees_brutes_test)
        mode_valeurs_test = mode(self.donnees_brutes_test, axis=1)[0]
        skew_valeurs_test = skew(self.donnees_brutes_test, axis=1)
        kurtosis_valeurs_test = kurtosis(self.donnees_brutes_test, axis=1)

        x_test_features = np.column_stack((moyenne_test, maximum_test, minimum_test, variance_test, ecart_type_test, mediane_test, sma_test, energie_test, iqr_test, entropie_valeurs_test, indices_max_freq_test, frequences_moyennes_test, mode_valeurs_test, skew_valeurs_test, kurtosis_valeurs_test))

        return x_train_features, x_test_features

    def extraction_BOP(self):                           # Fonction qui permet d'extraire les caractéristiques avec la méthode Bag-of-Patterns
       bop = BagOfPatterns(window_size=32, word_size=5, sparse=False, numerosity_reduction=True)
       self.bop_model = bop.fit(self.donnees_brutes_train)
       return self.bop_model.fit_transform(self.donnees_brutes_train), self.bop_model.transform(self.donnees_brutes_test) if self.donnees_brutes_test is not None else None
       
    def extraction_BOSS(self):                          # Fonction qui permet d'extraire les caractéristiques avec la méthode Bag-of-SFA-Symbols
        boss = BOSS(word_size=5, n_bins=5, window_size=24, sparse=False)
        self.boss_model = boss.fit(self.donnees_brutes_train)
        return self.boss_model.fit_transform(self.donnees_brutes_train), self.boss_model.transform(self.donnees_brutes_test) if self.donnees_brutes_test is not None else None

    def extration_BOP_BOSS(self):
        bop_train, bop_test = self.extraction_BOP()
        boss_train, boss_test = self.extraction_BOSS()
        return np.column_stack((bop_train, boss_train)), np.column_stack((bop_test, boss_test)) if bop_test is not None and boss_test is not None else None


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

from sklearn.decomposition import PCA

class ReductionDimensionnaliteDataset:
    def __init__(self, x_train, x_test, n_components=0.98):
        self.x_train = x_train
        self.x_test = x_test
        self.n_components = n_components
        self.pca_obj = PCA(n_components=self.n_components)

    def pca(self):
        x_train_pca = self.pca_obj.fit_transform(self.x_train)      # fit_transform() permet d'appliquer la réduction de dimensionnalité sur les données d'entraînement
        x_test_pca = self.pca_obj.transform(self.x_test)            # transform() permet d'appliquer la même réduction de dimensionnalité sur les données de test
        return x_train_pca, x_test_pca


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

import matplotlib.pyplot as plt
from sklearn import svm
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

class ClassificationEvaluationDataset:
    def __init__(self, x_train_pca, y_train, x_test_pca, y_test):
        self.x_train_pca = x_train_pca
        self.y_train = y_train
        self.x_test_pca = x_test_pca
        self.y_test = y_test

        self.modeles = {                                    # Dictionnaire qui contient les modèles à tester
            "svm": svm.SVC(),
            "knn": KNeighborsClassifier(n_neighbors=11),
            "rf": RandomForestClassifier(n_estimators=150),
            "dt": DecisionTreeClassifier(max_depth=5),
            "mlp": MLPClassifier(hidden_layer_sizes=(100, 100, 100), max_iter=500),
            "lsvc": LinearSVC(),
            "gnb": GaussianNB()
        }
    
    def entrainement(self, model_name="svm"):
        current_modele = self.modeles[model_name]                   # On récupère le modèle correspondant au nom donné
        current_modele.fit(self.x_train_pca, self.y_train)          # On entraîne le modèle
        self.current_modele = current_modele
        return current_modele
    
    def prediction(self):
        if self.current_modele is not None:
            self.entrainement()                                        # Entrainement du modèle svm si pas encore de modèle entrainé
        self.y_pred = self.current_modele.predict(self.x_test_pca)  # On teste le modèle
        return self.y_pred
    
    def test_pred(self):
        if self.y_pred is not None:
            self.prediction()                                          # Entrainement et prédiction du modèle svm si pas encore de prédictions
    
    def taux_reconnaissance(self):
        self.test_pred()
        
        # Taux de reconnaissance (accuracy)
        return accuracy_score(self.y_test, self.y_pred)
    
    def rapport_classification(self):
        self.test_pred()
        
        # Rappel, précision et f1-score
        rapport = classification_report(self.y_test, self.y_pred, output_dict=True, zero_division=1)
        rc_df = pd.DataFrame(rapport).transpose()
        return rc_df.round(3)                                       # On arrondit les valeurs à 3 chiffres après la virgule
    
    def affichage_matrice_confusion(self, matrice):
        # Affichage de la matrice de confusion avec matplotlib
        pourcentage = (matrice.astype('float') / matrice.sum(axis=1)[:, np.newaxis])*100   # On calcule le pourcentage de chaque valeur de la matrice de confusion

        plt.figure(figsize=(4, 4))
        plt.imshow(pourcentage, cmap="coolwarm", vmin=0, vmax=100)
        plt.colorbar(format='%1.1f%%')                                                     # On affiche la barre de couleur avec les pourcentages
        plt.xlabel("Valeurs prédites")
        plt.ylabel("Valeurs réelles")
        plt.title("Matrice de confusion")

        for (i, j), z in np.ndenumerate(pourcentage):                                       # On affiche les pourcentages dans la matrice de confusion
            if i == j:
                plt.text(j, i, '{:0.1f}%'.format(z), ha='center', va='center', color='black')
            else:
                plt.text(j, i, '{:0.1f}%'.format(z), ha='center', va='center')

        plt.xticks(np.arange(matrice.shape[1]), np.arange(1, matrice.shape[1] + 1))         # On affiche les valeurs des axes
        plt.yticks(np.arange(matrice.shape[0]), np.arange(1, matrice.shape[0] + 1))
        plt.show()
    
    def matrice_confusion(self, affichage=False):
        self.test_pred()
        
        # Matrice de confusion
        matrice = confusion_matrix(self.y_test, self.y_pred)
        
        if affichage:
            cm_df = pd.DataFrame(matrice)
            cm_df.index = cm_df.index + 1                           # On fait commencer par 1 au lieu de 0
            cm_df.columns = cm_df.columns + 1
            print("\nMatrice de confusion : \n", cm_df)
            print("")
            
            self.affichage_matrice_confusion(matrice)
        return matrice
    
    def entrainement_puis_rapport(self, model_name="svm", affichage=False):
        self.entrainement(model_name)
        print("\nEntrainement de " + model_name + " effectué")
        
        self.prediction()
        print("\nPrédictions effectuées")
        
        accuracy = self.taux_reconnaissance()
        print("\nTaux de reconnaissance (accuracy) : ", accuracy)
        
        rapport = self.rapport_classification()
        print("\nRapport de classification :\n", rapport)
        
        matrice = self.matrice_confusion(affichage)
        
        return accuracy, rapport, matrice


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

DATA_PATH = "static/track_my_moves/data/"

def testDataset():
    # Importation des données du dataset
    importDataset= ImportationDataset()
    donnees_brutes_train, y_train = importDataset.charger_donnees_entrainement()
    donnees_brutes_test, y_test = importDataset.charger_donnees_test()
    print("Importation des données du dataset finie.")

    # Extraction des caractéristiques
    extractionCaracts = ExtractionCaracteristiquesDataset(donnees_brutes_train, donnees_brutes_test)
    x_train, x_test = extractionCaracts.extration_BOP_BOSS()
    print("Extraction des caractériques du dataset finie.")

    # Réduction de dimensionnalité
    reductionDim = ReductionDimensionnaliteDataset(x_train, x_test)
    x_train_pca, x_test_pca = reductionDim.pca()
    print("Réduction de dimensionnalité du dataset finie.")
    
    # Classification (entrainement, prédiction et évaluation du modèle)
    classification = ClassificationEvaluationDataset(x_train_pca, y_train, x_test_pca, y_test)
    classification.entrainement_puis_rapport(affichage=True)




# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
#                               Model with database
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

import numpy as np
from scipy.stats import entropy, mode, skew, kurtosis

from .models.activity_AI import ActivityAI

class ManageActivityAI:
    slice_len = 25
    
    def checkInterval(self, interval):
        return len(interval["sensors_intervals"]) >= self.slice_len * 3
    
    def checkActivity(self, activity):
        for interval in activity["intervals"]:
            if self.checkInterval(interval):
                return True
        return False
    
    def sensorsIntervalsToArray(self, sensorsIntervals):
        array = []
        
        for interval in sensorsIntervals:
            array.append([interval["accel_x"], interval["accel_y"], interval["accel_z"], interval["gyros_x"], interval["gyros_y"], interval["gyros_z"]])
        return array
    
    def createSlicedSensorsIntervals(self, intervals):
        sliced_sensors_intervals = []
        
        for interval in intervals:
            sensors_intervals = interval["sensors_intervals"][self.slice_len : - self.slice_len] # Remove 25 first and last intervals (first and last 2.5 sec)
            print("len(sensors_intervals): ", len(sensors_intervals))
            
            for i in range(self.slice_len, len(sensors_intervals), self.slice_len): # For each 25 intervals (slice)
                slice = sensors_intervals[i-self.slice_len : i] # Create slice of 25 sensors intervals
                sliced_sensors_intervals.append(self.sensorsIntervalsToArray(slice))
        
        return sliced_sensors_intervals