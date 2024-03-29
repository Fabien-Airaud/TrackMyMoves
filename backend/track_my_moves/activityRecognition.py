# import os
# import pandas as pd

# DATASET_PATH = "static/track_my_moves/dataset"

# class ImportationDataset:
#     def lire_fichier(self, path):
#         return pd.read_csv(path, delim_whitespace=True, header=None)
    
#     def charger_donnees(self, chemin, type = "train"):
#         donnees_brutes = self.lire_fichier(os.path.join(chemin, f"x_{type}.txt"))
#         annotations = self.lire_fichier(os.path.join(chemin, f"y_{type}.txt"))
#         y = annotations.values.ravel()
#         return donnees_brutes, y
    
#     def charger_donnees_entrainement(self):                                        
#         chemin_train = os.path.join(DATASET_PATH, "train")
#         return self.charger_donnees(chemin_train, "train")

#     def charger_donnees_test(self):
#         chemin_test = os.path.join(DATASET_PATH, "test")
#         return self.charger_donnees(chemin_test, "test")


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

# import numpy as np
# from scipy.stats import entropy, mode, skew, kurtosis 
# from pyts.transformation import BagOfPatterns, BOSS

# class ExtractionCaracteristiquesDataset:
#     def __init__(self, donnees_brutes_train, donnees_brutes_test):
#         self.donnees_brutes_train = donnees_brutes_train
#         self.donnees_brutes_test = donnees_brutes_test

#     def entropie(self, signal):
#         histogramme = np.histogram(signal, bins=100)[0]
#         histogramme = histogramme / np.sum(histogramme)
#         return entropy(histogramme)
    
#     def frequence_moyenne(self, signal):
#         frequence_amplitude = np.abs(np.fft.fft(signal))
#         freqs = np.fft.fftfreq(len(signal))
#         return np.average(freqs, weights=frequence_amplitude)

#     def extraction_metriques_stat(self):                # Fonction qui permet d'extraire les métriques statistiques
#         moyenne = np.mean(self.donnees_brutes_train, axis=1)
#         maximum = np.max(self.donnees_brutes_train, axis=1)
#         minimum = np.min(self.donnees_brutes_train, axis=1)
#         variance = np.var(self.donnees_brutes_train, axis=1)
#         ecart_type = np.std(self.donnees_brutes_train, axis=1)
#         mediane = np.median(self.donnees_brutes_train, axis=1)
#         sma = np.sum(np.abs(self.donnees_brutes_train), axis=1)
#         energie = np.sum(self.donnees_brutes_train**2, axis=1)
#         iqr = np.percentile(self.donnees_brutes_train, 75, axis=1) - np.percentile(self.donnees_brutes_train, 25, axis=1)
#         entropie_valeurs = np.apply_along_axis(self.entropie, 1, self.donnees_brutes_train)
#         indices_max_freq = np.argmax(np.abs(np.fft.fft(self.donnees_brutes_train)), axis=1)
#         frequences_moyennes = np.apply_along_axis(self.frequence_moyenne, 1, self.donnees_brutes_train)
#         mode_valeurs = mode(self.donnees_brutes_train, axis=1)[0]
#         skew_valeurs = skew(self.donnees_brutes_train, axis=1)
#         kurtosis_valeurs = kurtosis(self.donnees_brutes_train, axis=1)

#         x_train_features = np.column_stack((moyenne, maximum, minimum, variance, ecart_type, mediane, sma, energie, iqr, entropie_valeurs, indices_max_freq, frequences_moyennes, mode_valeurs, skew_valeurs, kurtosis_valeurs))

#         moyenne_test = np.mean(self.donnees_brutes_test, axis=1)
#         maximum_test = np.max(self.donnees_brutes_test, axis=1)
#         minimum_test = np.min(self.donnees_brutes_test, axis=1)
#         variance_test = np.var(self.donnees_brutes_test, axis=1)
#         ecart_type_test = np.std(self.donnees_brutes_test, axis=1)
#         mediane_test = np.median(self.donnees_brutes_test, axis=1)
#         sma_test = np.sum(np.abs(self.donnees_brutes_test), axis=1)
#         energie_test = np.sum(self.donnees_brutes_test**2, axis=1)
#         iqr_test = np.percentile(self.donnees_brutes_test, 75, axis=1) - np.percentile(self.donnees_brutes_test, 25, axis=1)
#         entropie_valeurs_test = np.apply_along_axis(self.entropie, 1, self.donnees_brutes_test)
#         indices_max_freq_test = np.argmax(np.abs(np.fft.fft(self.donnees_brutes_test)), axis=1)
#         frequences_moyennes_test = np.apply_along_axis(self.frequence_moyenne, 1, self.donnees_brutes_test)
#         mode_valeurs_test = mode(self.donnees_brutes_test, axis=1)[0]
#         skew_valeurs_test = skew(self.donnees_brutes_test, axis=1)
#         kurtosis_valeurs_test = kurtosis(self.donnees_brutes_test, axis=1)

#         x_test_features = np.column_stack((moyenne_test, maximum_test, minimum_test, variance_test, ecart_type_test, mediane_test, sma_test, energie_test, iqr_test, entropie_valeurs_test, indices_max_freq_test, frequences_moyennes_test, mode_valeurs_test, skew_valeurs_test, kurtosis_valeurs_test))

#         return x_train_features, x_test_features

#     def extraction_BOP(self):                           # Fonction qui permet d'extraire les caractéristiques avec la méthode Bag-of-Patterns
#        bop = BagOfPatterns(window_size=32, word_size=5, sparse=False, numerosity_reduction=True)
#        self.bop_model = bop.fit(self.donnees_brutes_train)
#        return self.bop_model.fit_transform(self.donnees_brutes_train), self.bop_model.transform(self.donnees_brutes_test) if self.donnees_brutes_test is not None else None
       
#     def extraction_BOSS(self):                          # Fonction qui permet d'extraire les caractéristiques avec la méthode Bag-of-SFA-Symbols
#         boss = BOSS(word_size=5, n_bins=5, window_size=24, sparse=False)
#         self.boss_model = boss.fit(self.donnees_brutes_train)
#         return self.boss_model.fit_transform(self.donnees_brutes_train), self.boss_model.transform(self.donnees_brutes_test) if self.donnees_brutes_test is not None else None

#     def extration_BOP_BOSS(self):
#         bop_train, bop_test = self.extraction_BOP()
#         boss_train, boss_test = self.extraction_BOSS()
#         return np.column_stack((bop_train, boss_train)), np.column_stack((bop_test, boss_test)) if bop_test is not None and boss_test is not None else None


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

# from sklearn.decomposition import PCA

# class ReductionDimensionnaliteDataset:
#     def __init__(self, x_train, x_test, n_components=0.98):
#         self.x_train = x_train
#         self.x_test = x_test
#         self.n_components = n_components
#         self.pca_obj = PCA(n_components=self.n_components)

#     def pca(self):
#         x_train_pca = self.pca_obj.fit_transform(self.x_train)      # fit_transform() permet d'appliquer la réduction de dimensionnalité sur les données d'entraînement
#         x_test_pca = self.pca_obj.transform(self.x_test)            # transform() permet d'appliquer la même réduction de dimensionnalité sur les données de test
#         return x_train_pca, x_test_pca


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

# import matplotlib.pyplot as plt
# from sklearn import svm
# from sklearn.neighbors import KNeighborsClassifier
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.tree import DecisionTreeClassifier
# from sklearn.neural_network import MLPClassifier
# from sklearn.svm import LinearSVC
# from sklearn.naive_bayes import GaussianNB
# from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

# class ClassificationEvaluationDataset:
#     def __init__(self, x_train_pca, y_train, x_test_pca, y_test):
#         self.x_train_pca = x_train_pca
#         self.y_train = y_train
#         self.x_test_pca = x_test_pca
#         self.y_test = y_test

#         self.modeles = {                                    # Dictionnaire qui contient les modèles à tester
#             "svm": svm.SVC(),
#             "knn": KNeighborsClassifier(n_neighbors=11),
#             "rf": RandomForestClassifier(n_estimators=150),
#             "dt": DecisionTreeClassifier(max_depth=5),
#             "mlp": MLPClassifier(hidden_layer_sizes=(100, 100, 100), max_iter=500),
#             "lsvc": LinearSVC(),
#             "gnb": GaussianNB()
#         }
    
#     def entrainement(self, model_name="svm"):
#         current_modele = self.modeles[model_name]                   # On récupère le modèle correspondant au nom donné
#         current_modele.fit(self.x_train_pca, self.y_train)          # On entraîne le modèle
#         self.current_modele = current_modele
#         return current_modele
    
#     def prediction(self):
#         if self.current_modele is not None:
#             self.entrainement()                                        # Entrainement du modèle svm si pas encore de modèle entrainé
#         self.y_pred = self.current_modele.predict(self.x_test_pca)  # On teste le modèle
#         return self.y_pred
    
#     def test_pred(self):
#         if self.y_pred is not None:
#             self.prediction()                                          # Entrainement et prédiction du modèle svm si pas encore de prédictions
    
#     def taux_reconnaissance(self):
#         self.test_pred()
        
#         # Taux de reconnaissance (accuracy)
#         return accuracy_score(self.y_test, self.y_pred)
    
#     def rapport_classification(self):
#         self.test_pred()
        
#         # Rappel, précision et f1-score
#         rapport = classification_report(self.y_test, self.y_pred, output_dict=True, zero_division=1)
#         rc_df = pd.DataFrame(rapport).transpose()
#         return rc_df.round(3)                                       # On arrondit les valeurs à 3 chiffres après la virgule
    
#     def affichage_matrice_confusion(self, matrice):
#         # Affichage de la matrice de confusion avec matplotlib
#         pourcentage = (matrice.astype('float') / matrice.sum(axis=1)[:, np.newaxis])*100   # On calcule le pourcentage de chaque valeur de la matrice de confusion

#         plt.figure(figsize=(4, 4))
#         plt.imshow(pourcentage, cmap="coolwarm", vmin=0, vmax=100)
#         plt.colorbar(format='%1.1f%%')                                                     # On affiche la barre de couleur avec les pourcentages
#         plt.xlabel("Valeurs prédites")
#         plt.ylabel("Valeurs réelles")
#         plt.title("Matrice de confusion")

#         for (i, j), z in np.ndenumerate(pourcentage):                                       # On affiche les pourcentages dans la matrice de confusion
#             if i == j:
#                 plt.text(j, i, '{:0.1f}%'.format(z), ha='center', va='center', color='black')
#             else:
#                 plt.text(j, i, '{:0.1f}%'.format(z), ha='center', va='center')

#         plt.xticks(np.arange(matrice.shape[1]), np.arange(1, matrice.shape[1] + 1))         # On affiche les valeurs des axes
#         plt.yticks(np.arange(matrice.shape[0]), np.arange(1, matrice.shape[0] + 1))
#         plt.show()
    
#     def matrice_confusion(self, affichage=False):
#         self.test_pred()
        
#         # Matrice de confusion
#         matrice = confusion_matrix(self.y_test, self.y_pred)
        
#         if affichage:
#             cm_df = pd.DataFrame(matrice)
#             cm_df.index = cm_df.index + 1                           # On fait commencer par 1 au lieu de 0
#             cm_df.columns = cm_df.columns + 1
#             print("\nMatrice de confusion : \n", cm_df)
#             print("")
            
#             self.affichage_matrice_confusion(matrice)
#         return matrice
    
#     def entrainement_puis_rapport(self, model_name="svm", affichage=False):
#         self.entrainement(model_name)
#         print("\nEntrainement de " + model_name + " effectué")
        
#         self.prediction()
#         print("\nPrédictions effectuées")
        
#         accuracy = self.taux_reconnaissance()
#         print("\nTaux de reconnaissance (accuracy) : ", accuracy)
        
#         rapport = self.rapport_classification()
#         print("\nRapport de classification :\n", rapport)
        
#         matrice = self.matrice_confusion(affichage)
        
#         return accuracy, rapport, matrice


# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

# MODELS_PATH = "static/track_my_moves/data/"

# def testDataset():
#     # Importation des données du dataset
#     importDataset= ImportationDataset()
#     donnees_brutes_train, y_train = importDataset.charger_donnees_entrainement()
#     donnees_brutes_test, y_test = importDataset.charger_donnees_test()
#     print("Importation des données du dataset finie.")

#     # Extraction des caractéristiques
#     extractionCaracts = ExtractionCaracteristiquesDataset(donnees_brutes_train, donnees_brutes_test)
#     x_train, x_test = extractionCaracts.extration_BOP_BOSS()
#     print("Extraction des caractériques du dataset finie.")

#     # Réduction de dimensionnalité
#     reductionDim = ReductionDimensionnaliteDataset(x_train, x_test)
#     x_train_pca, x_test_pca = reductionDim.pca()
#     print("Réduction de dimensionnalité du dataset finie.")
    
#     # Classification (entrainement, prédiction et évaluation du modèle)
#     classification = ClassificationEvaluationDataset(x_train_pca, y_train, x_test_pca, y_test)
#     classification.entrainement_puis_rapport(affichage=True)




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

ACTIVITY_AI_FIELDS = [
    "id", "user", "activity", "activity_type", "recognition_type",
    "mean_accel_x", "mean_accel_y", "mean_accel_z", "mean_gyros_x", "mean_gyros_y", "mean_gyros_z",
    "max_accel_x", "max_accel_y", "max_accel_z", "max_gyros_x", "max_gyros_y", "max_gyros_z",
    "min_accel_x", "min_accel_y", "min_accel_z", "min_gyros_x", "min_gyros_y", "min_gyros_z",
    "var_accel_x", "var_accel_y", "var_accel_z", "var_gyros_x", "var_gyros_y", "var_gyros_z",
    "std_accel_x", "std_accel_y", "std_accel_z", "std_gyros_x", "std_gyros_y", "std_gyros_z",
    "median_accel_x", "median_accel_y", "median_accel_z", "median_gyros_x", "median_gyros_y", "median_gyros_z",
    "sma_accel_x", "sma_accel_y", "sma_accel_z", "sma_gyros_x", "sma_gyros_y", "sma_gyros_z",
    "energy_accel_x", "energy_accel_y", "energy_accel_z", "energy_gyros_x", "energy_gyros_y", "energy_gyros_z",
    "iqr_accel_x", "iqr_accel_y", "iqr_accel_z", "iqr_gyros_x", "iqr_gyros_y", "iqr_gyros_z",
    "entropy_accel_x", "entropy_accel_y", "entropy_accel_z", "entropy_gyros_x", "entropy_gyros_y", "entropy_gyros_z",
    "maxInds_accel_x", "maxInds_accel_y", "maxInds_accel_z", "maxInds_gyros_x", "maxInds_gyros_y", "maxInds_gyros_z",
    "meanFreq_accel_x", "meanFreq_accel_y", "meanFreq_accel_z", "meanFreq_gyros_x", "meanFreq_gyros_y", "meanFreq_gyros_z",
    "mode_accel_x", "mode_accel_y", "mode_accel_z", "mode_gyros_x", "mode_gyros_y", "mode_gyros_z",
    "skew_accel_x", "skew_accel_y", "skew_accel_z", "skew_gyros_x", "skew_gyros_y", "skew_gyros_z",
    "kurtosis_accel_x", "kurtosis_accel_y", "kurtosis_accel_z", "kurtosis_gyros_x", "kurtosis_gyros_y", "kurtosis_gyros_z"
]

from os import path
import joblib

FOLDER_PATH = "static/track_my_moves/"
JOBLIB_EXTENSION = ".joblib"

import pandas as pd
import numpy as np
from scipy.stats import entropy, mode, skew, kurtosis

from .models.activity_AI import ActivityAI

class ManageActivityAI:
    slice_len = 25
    
    # Internal function
    def checkInterval(self, interval):
        return len(interval["sensors_intervals"]) >= self.slice_len * 3
    
    def checkActivity(self, activity):
        for interval in activity["intervals"]:
            if self.checkInterval(interval):
                return True
        return False
    
    # Internal function
    def sensorsIntervalsToArray(self, sensorsIntervals):
        array = []
        
        for interval in sensorsIntervals:
            array.append([interval["accel_x"], interval["accel_y"], interval["accel_z"], interval["gyros_x"], interval["gyros_y"], interval["gyros_z"]])
        return array
    
    # Internal function
    def createSlicedSensorsIntervals(self, intervals):
        sliced_sensors_intervals = []
        
        for interval in intervals:
            sensors_intervals = interval["sensors_intervals"][self.slice_len : - self.slice_len] # Remove 25 first and last intervals (first and last 2.5 sec)
            
            for i in range(self.slice_len, len(sensors_intervals), self.slice_len): # For each 25 intervals (slice)
                slice = sensors_intervals[i-self.slice_len : i] # Create slice of 25 sensors intervals
                sliced_sensors_intervals.append(self.sensorsIntervalsToArray(slice))
        
        return sliced_sensors_intervals
    
    # Internal function
    def calc_entropy(self, signal):
        hist = np.histogram(signal, bins=50)[0]
        hist = hist / np.sum(hist)
        return entropy(hist)
    
    # Internal function
    def calc_average_frequency(self, signal):
        frequence_amplitude = np.abs(np.fft.fft(signal))
        freqs = np.fft.fftfreq(len(signal))
        return np.average(freqs, weights=frequence_amplitude)
    
    def AddActivityAI(self, activity):
        user_id = activity["user"]
        activity_id = activity["id"]
        activity_type_id = activity["activity_type"]
        recognition_type = "NO"
        slicedIntervals = self.createSlicedSensorsIntervals(activity["intervals"])
        
        for slice in slicedIntervals: # For each slice of 25 sensors intervals
            mean = np.mean(slice, axis=0)
            maximum = np.max(slice, axis=0)
            minimum = np.min(slice, axis=0)
            variance = np.var(slice, axis=0)
            stand_dev = np.std(slice, axis=0)
            median = np.median(slice, axis=0)
            sma = np.sum(np.abs(slice), axis=0)
            energy = np.sum(np.power(slice, 2), axis=0)
            iqr = np.percentile(slice, 75, axis=0) - np.percentile(slice, 25, axis=0)
            entropy_values = np.apply_along_axis(self.calc_entropy, 0, slice)
            max_freq_ind = np.argmax(np.abs(np.fft.fft(slice)), axis=0)
            average_freq = np.apply_along_axis(self.calc_average_frequency, 0, slice)
            mode_values = mode(slice, axis=0)[0]
            skew_values = skew(slice, axis=0)
            kurtosis_values = kurtosis(slice, axis=0)
            
            ActivityAI.objects.create(
                user_id = user_id, activity_id = activity_id, activity_type_id = activity_type_id, recognition_type = recognition_type,
                mean_accel_x = mean[0], mean_accel_y = mean[1], mean_accel_z = mean[2], mean_gyros_x = mean[3], mean_gyros_y = mean[4], mean_gyros_z = mean[5],
                max_accel_x = maximum[0], max_accel_y = maximum[1], max_accel_z = maximum[2], max_gyros_x = maximum[3], max_gyros_y = maximum[4], max_gyros_z = maximum[5],
                min_accel_x = minimum[0], min_accel_y = minimum[1], min_accel_z = minimum[2], min_gyros_x = minimum[3], min_gyros_y = minimum[4], min_gyros_z = minimum[5],
                var_accel_x = variance[0], var_accel_y = variance[1], var_accel_z = variance[2], var_gyros_x = variance[3], var_gyros_y = variance[4], var_gyros_z = variance[5],
                std_accel_x = stand_dev[0], std_accel_y = stand_dev[1], std_accel_z = stand_dev[2], std_gyros_x = stand_dev[3], std_gyros_y = stand_dev[4], std_gyros_z = stand_dev[5],
                median_accel_x = median[0], median_accel_y = median[1], median_accel_z = median[2], median_gyros_x = median[3], median_gyros_y = median[4], median_gyros_z = median[5],
                sma_accel_x = sma[0], sma_accel_y = sma[1], sma_accel_z = sma[2], sma_gyros_x = sma[3], sma_gyros_y = sma[4], sma_gyros_z = sma[5],
                energy_accel_x = energy[0], energy_accel_y = energy[1], energy_accel_z = energy[2], energy_gyros_x = energy[3], energy_gyros_y = energy[4], energy_gyros_z = energy[5],
                iqr_accel_x = iqr[0], iqr_accel_y = iqr[1], iqr_accel_z = iqr[2], iqr_gyros_x = iqr[3], iqr_gyros_y = iqr[4], iqr_gyros_z = iqr[5],
                entropy_accel_x = entropy_values[0], entropy_accel_y = entropy_values[1], entropy_accel_z = entropy_values[2], entropy_gyros_x = entropy_values[3], entropy_gyros_y = entropy_values[4], entropy_gyros_z = entropy_values[5],
                maxInds_accel_x = max_freq_ind[0], maxInds_accel_y = max_freq_ind[1], maxInds_accel_z = max_freq_ind[2], maxInds_gyros_x = max_freq_ind[3], maxInds_gyros_y = max_freq_ind[4], maxInds_gyros_z = max_freq_ind[5],
                meanFreq_accel_x = average_freq[0], meanFreq_accel_y = average_freq[1], meanFreq_accel_z = average_freq[2], meanFreq_gyros_x = average_freq[3], meanFreq_gyros_y = average_freq[4], meanFreq_gyros_z = average_freq[5],
                mode_accel_x = mode_values[0], mode_accel_y = mode_values[1], mode_accel_z = mode_values[2], mode_gyros_x = mode_values[3], mode_gyros_y = mode_values[4], mode_gyros_z = mode_values[5],
                skew_accel_x = skew_values[0], skew_accel_y = skew_values[1], skew_accel_z = skew_values[2], skew_gyros_x = skew_values[3], skew_gyros_y = skew_values[4], skew_gyros_z = skew_values[5],
                kurtosis_accel_x = kurtosis_values[0], kurtosis_accel_y = kurtosis_values[1], kurtosis_accel_z = kurtosis_values[2], kurtosis_gyros_x = kurtosis_values[3], kurtosis_gyros_y = kurtosis_values[4], kurtosis_gyros_z = kurtosis_values[5])
    
    def extractUserActivities(self, user_id, recognition_type, activity_id=None):
        if activity_id == None:
            activities = ActivityAI.objects.filter(user_id=user_id, recognition_type=recognition_type)
        else:
            activities = ActivityAI.objects.filter(user_id=user_id, activity_id=activity_id)
        x = []
        y = []
        
        fields = ACTIVITY_AI_FIELDS[5:] # keep only metrics fields
        
        for activity in activities:
            activityDict = activity.__dict__
            del activityDict["id"]
            del activityDict["user_id"]
            del activityDict["activity_id"]
            y.append(activityDict["activity_type_id"]) # keep activity type for y (labels)
            del activityDict["activity_type_id"]
            del activityDict["recognition_type"]
            
            metrics = []
            for label in fields:
                metrics.append(activityDict[label])
            
            x.append(metrics) # give all metrics to x (data)
        return x, y
    
    def changeActivityAIRecognitionType(self, activity_id, recognition_type):
        activitiesAI = ActivityAI.objects.filter(activity_id=activity_id)
        
        for activityAI in activitiesAI:
            activityAI.recognition_type = recognition_type
            activityAI.save()

# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

PCA_PATH = FOLDER_PATH + "pca/"

from sklearn.decomposition import PCA

class DimensionalityReduction:
    def __init__(self, user_id, n_components=0.98):
        self.user_id = user_id
        self.pca_path = PCA_PATH + str(user_id) + JOBLIB_EXTENSION
        self.n_components = n_components

    def pca_train(self, x_train):
        pca_obj = PCA(n_components=self.n_components)
        x_train_pca = pca_obj.fit_transform(x_train)
        joblib.dump(pca_obj, self.pca_path)
        return x_train_pca

    def pca_test(self, x_test):
        if not path.exists(self.pca_path):
            return None
        
        pca_obj = joblib.load(self.pca_path)
        x_test_pca = pca_obj.transform(x_test)
        return x_test_pca

# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------
# ----------------------------------------------------------------------------------------------------

from .models.activity_type import ActivityType
from sklearn import svm
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

MODELS_PATH = FOLDER_PATH + "models/"

class manageModelAI:
    def __init__(self, user_id):
        self.user_id = user_id
        self.model_path = MODELS_PATH + str(user_id) + JOBLIB_EXTENSION
        self.manageAI = ManageActivityAI()
    
    #Internal function
    def getDistinct(self, activitiesAi):
        seenActivities = []
        toRemoveIds = []
        
        for i in range(0, len(activitiesAi)):
            activity_id = activitiesAi[i].activity_id
            if activity_id not in seenActivities:
                seenActivities.insert(0, activity_id)
            else:
                toRemoveIds.append(activitiesAi[i].id)
        
        for id in toRemoveIds:
            activitiesAi = activitiesAi.exclude(id=id)
        return activitiesAi
    
    # Internal function
    def changeActivitiesAIRecognitionType(self, activitiesAI, recognition_type):
        for activityAI in activitiesAI:
            print("Activity", activityAI.activity_id, activityAI.activity_type_id , activityAI.recognition_type, " -> ", recognition_type)
            if activityAI.recognition_type != recognition_type:
                self.manageAI.changeActivityAIRecognitionType(activityAI.activity_id, recognition_type)
    
    # Internal function
    def selectTrainActivitiesAI(self, activitiesAI):
        activitiesToTrain = []
        activitiesToTest = []
        
        activityTypes = ActivityType.objects.all()
        for activityType in activityTypes:
            activities = activitiesAI.filter(activity_type_id=activityType.id)
            count = activities.count()
            
            if count == 1 or count == 2: # if less than 3 activities in an activityType, give 1 for training
                activitiesToTrain.append(activities[0])
                if count == 2:
                    activitiesToTest.append(activities[1])
            elif count > 2: # if more than 2 activities in an activityType, give 80% for training
                for i in range(0, int(count * 8 / 10)-1):
                    activitiesToTrain.append(activities[i])
                for j in range(int(count * 8 / 10)-1, count):
                    activitiesToTest.append(activities[j])
        
        return activitiesToTrain, activitiesToTest
    
    # Internal function
    def changeGroups(self):
        activitiesAI_ALL = ActivityAI.objects.filter(user_id=self.user_id)
        activitiesAI_NO = self.getDistinct(activitiesAI_ALL.filter(recognition_type="NO"))
        activitiesAI_Others = self.getDistinct(activitiesAI_ALL.exclude(recognition_type="NO"))
        
        self.changeActivitiesAIRecognitionType(activitiesAI_NO, "TE") # Change all Nothing to Test
        
        activitiesAI_ToTR, activitiesAI_ToTE = self.selectTrainActivitiesAI(activitiesAI_Others) # Select which activities should be for training
        self.changeActivitiesAIRecognitionType(activitiesAI_ToTR, "TR") # Change selected activities to Train
        self.changeActivitiesAIRecognitionType(activitiesAI_ToTE, "TE") # Change selected activities to Test
    
    def train(self):
        model_svm = svm.SVC()
        self.changeGroups()
        
        x_train, y_train = self.manageAI.extractUserActivities(self.user_id, "TR")
        if len(x_train) == 0:
            return False, "Not enough data for training, please do more activities or longer (> 7.5 seconds)"
        
        dr = DimensionalityReduction(self.user_id)
        x_train_pca = dr.pca_train(x_train)
        
        model_svm.fit(x_train_pca, y_train)
        joblib.dump(model_svm, self.model_path)
        return True, "Model training successful"
    
    def test(self):
        if not path.exists(self.model_path):
            result, message = self.train()
            if not result:
                return result, message
        
        model_svm = joblib.load(self.model_path)
        
        x_test, y_test = self.manageAI.extractUserActivities(self.user_id, "TE")
        if len(x_test) == 0:
            return False, "Not enough data for testing, please do more activities or longer (> 7.5 seconds)"
        
        dr = DimensionalityReduction(self.user_id)
        x_test_pca = dr.pca_test(x_test)
        
        y_pred = model_svm.predict(x_test_pca)
        
        # Accuracy
        accuracy = accuracy_score(y_test, y_pred)
        print("\nAccuracy: ", accuracy)
        
        # Recall, precision and f1-score
        report = classification_report(y_test, y_pred, output_dict=True, zero_division=1)
        rc_df = pd.DataFrame(report).transpose().round(3)
        print("\nReport:\n", rc_df)
        
        # Matrice de confusion
        matrix = confusion_matrix(y_test, y_pred)
        cm_df = pd.DataFrame(matrix)
        cm_df.index = cm_df.index + 1              
        cm_df.columns = cm_df.columns + 1
        print("\nConfusion matrix :\n", cm_df)
        
        return True, {"accuracy": accuracy, "report": report, "matrix": matrix}
    
    # Internal function
    def bestActivityType(self, y_pred):
        activityTypes = {}
        maxCount = 0
        best = 0
        
        for value in y_pred:
            if value in activityTypes:
                activityTypes[value] += 1
            else:
                activityTypes[value] = 1
            
            if activityTypes[value] > maxCount:
                maxCount = activityTypes[value]
                best = value
        return best, maxCount
    
    def guessActivityType(self, activity_id):
        if not path.exists(self.model_path):
            result, message = self.train()
            if not result:
                return result, message
        
        model_svm = joblib.load(self.model_path)
        
        x_test, y_test = self.manageAI.extractUserActivities(self.user_id, "NO", activity_id)
        if len(x_test) == 0:
            return False, "Not enough data for guessing, please do at least 1 interval of 7.5 seconds in your activities"
        
        dr = DimensionalityReduction(self.user_id)
        x_test_pca = dr.pca_test(x_test)
        
        y_pred = model_svm.predict(x_test_pca)
        print("y_test: ", y_test)
        print("y_pred: ", y_pred)
        
        best, maxCount = self.bestActivityType(y_pred)
        rate = (maxCount * 100) / len(y_pred)
        return True, {"activity_type": best, "rate": rate, "accuracy": accuracy_score(y_test, y_pred)}