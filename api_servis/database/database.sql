CREATE TABLE IF NOT EXISTS Kategorija (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    naziv VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS Proizvod (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    naziv VARCHAR(45) NOT NULL,
    opis VARCHAR(255) NOT NULL,
    cena INT NOT NULL,
    kategorija_id INT NOT NULL,
    FOREIGN KEY (kategorija_id) REFERENCES Kategorija(id)
);

CREATE TABLE IF NOT EXISTS Cvet (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    naziv VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS CvetUProizvodu (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cvet_id INT NOT NULL,
    proizvod_id INT NOT NULL,
    kolicina INT NOT NULL,
    FOREIGN KEY (cvet_id) REFERENCES Cvet(id),
    FOREIGN KEY (proizvod_id) REFERENCES Proizvod(id)
);

CREATE TABLE IF NOT EXISTS Narudzbina (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vreme_narudzbine DATETIME NOT NULL,
    zakazano_vreme DATETIME NOT NULL,
    status_narudzbine VARCHAR(45) NOT NULL,
    adresa VARCHAR(45) NOT NULL,
    telefon VARCHAR(45) NOT NULL,
    ime_prezime VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS StavkaNarudzbine (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    proizvod_id INT NOT NULL,
    narudzbina_id INT NOT NULL,
    kolicina INT NOT NULL,
    jedinicna_cena INT NOT NULL,
    FOREIGN KEY (proizvod_id) REFERENCES Proizvod(id),
    FOREIGN KEY (narudzbina_id) REFERENCES Narudzbina(id)
);

-- Insert into Kategorija
INSERT INTO Kategorija (naziv) VALUES ('Buket'), ('Aranžman');

-- Insert into Cvet
INSERT INTO Cvet (naziv) VALUES 
('Crvene ruže'),
('Roze ruže'),
('Žute ruže'),
('Orhideje'),
('Karanfili'),
('Ljiljani'),
('Astromerija'),
('Narcisi'),
('Lale'),
('Frezije'),
('Zumbuli');

-- Insert into Proizvod
INSERT INTO Proizvod (naziv, opis, cena, kategorija_id) VALUES 
('Midnight boquet', 'Midnight buket stvara tramnu i misterioznu atmosferu - 10 astromerija', 1200, (SELECT id FROM Kategorija WHERE naziv = 'Buket')),
('I love you', 'Savršen poklon za voljenu osobu (12 crvenih ruža)', 1440, (SELECT id FROM Kategorija WHERE naziv = 'Buket')),
('Warm summer day', 'Kada želite da osunčate Vaš dom (6 karanfila, 2 astromerije i 2 ljiljana).', 1800, (SELECT id FROM Kategorija WHERE naziv = 'Buket'));

-- Insert into CvetUProizvodu 
INSERT INTO CvetUProizvodu (cvet_id, proizvod_id, kolicina) VALUES 
((SELECT id FROM Cvet WHERE naziv = 'Astromerija'), (SELECT id FROM Proizvod WHERE naziv = 'Midnight boquet'), 10),
((SELECT id FROM Cvet WHERE naziv = 'Crvene ruže'), (SELECT id FROM Proizvod WHERE naziv = 'I love you'), 12),
((SELECT id FROM Cvet WHERE naziv = 'Karanfili'), (SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'), 6),
((SELECT id FROM Cvet WHERE naziv = 'Astromerija'), (SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'), 2),
((SELECT id FROM Cvet WHERE naziv = 'Ljiljani'), (SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'), 2);

-- Insert into Narudzbina
INSERT INTO Narudzbina (vreme_narudzbine, zakazano_vreme, status_narudzbine, adresa, telefon, ime_prezime) VALUES 
('2023-10-01 12:00:00', '2023-10-05 18:30:00', 'Nova', 'Kralja Milana 12/2', '0641234567', 'ime_prezime'),
('2023-10-01 12:00:00', '2023-10-06 12:00:00', 'Prihvaćena', 'Knez Mihailova 6/6', '0641234567', 'ime_prezime'),
('2023-10-01 12:00:00', '2023-10-06 14:00:00', 'Prihvaćena', 'Milutina Milankovića 17', '0641234567', 'ime_prezime');

-- Insert into StavkaNarudzbine
INSERT INTO StavkaNarudzbine (proizvod_id, narudzbina_id, kolicina, jedinicna_cena) VALUES 
((SELECT id FROM Proizvod WHERE naziv = 'I love you'), (SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-05 18:30:00'), 1, 1440),
((SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'), (SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-05 18:30:00'), 1, 1800),
((SELECT id FROM Proizvod WHERE naziv = 'Midnight boquet'), (SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-06 12:00:00'), 1, 1200),
((SELECT id FROM Proizvod WHERE naziv = 'I love you'), (SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-06 14:00:00'), 1, 1440);

/*
DROP TABLE IF EXISTS StavkaNarudzbine;
DROP TABLE IF EXISTS Narudzbina;
DROP TABLE IF EXISTS CvetUProizvodu;
DROP TABLE IF EXISTS Cvet;
DROP TABLE IF EXISTS Proizvod;
DROP TABLE IF EXISTS Kategorija;
*/