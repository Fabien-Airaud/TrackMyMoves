import os
import pandas as pd


DATASET_PATH = "static/track_my_moves/dataset"
DATA_PATH = "static/track_my_moves/data/"

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

def importDataset():
    # Importation des données du dataset
    importDataset= ImportationDataset()
    donnees_brutes_train, y_train = importDataset.charger_donnees_entrainement()
    donnees_brutes_test, y_test = importDataset.charger_donnees_test()
    
    print(donnees_brutes_train.head())
    return donnees_brutes_train, y_train, donnees_brutes_test, y_test