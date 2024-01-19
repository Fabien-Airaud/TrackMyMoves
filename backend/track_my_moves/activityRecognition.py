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

class ExtractionCaracteristiques:
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


DATA_PATH = "static/track_my_moves/data/"

def importDataset():
    # Importation des données du dataset
    importDataset= ImportationDataset()
    donnees_brutes_train, y_train = importDataset.charger_donnees_entrainement()
    donnees_brutes_test, y_test = importDataset.charger_donnees_test()
    print("Importation des données du dataset finie.")

    # Extraction des caractéristiques
    extractionCaracts = ExtractionCaracteristiques(donnees_brutes_train, donnees_brutes_test)
    x_train, x_test = extractionCaracts.extration_BOP_BOSS()
    print("Extraction des caractériques du dataset finie.")