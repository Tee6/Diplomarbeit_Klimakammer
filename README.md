# Klimakammer

## Authors

- [Joel Rupp](https://github.com/Joel05)
- [Niko Leimegger](https://github.com/Tee6)
- [Simon Koller](https://github.com/InZ8ne)

## Dokumentation

Die Motivation und Ausgangslage für die Entwicklung einer Klimakammer basiert auf dem Bedarf, klimatische Umweltsimulationen in Laboren weltweit durchführen zu können. Diese Klimakammer, ausgestattet mit Modulen für Temperatur, Luftfeuchtigkeit, Sonnenlicht und Regen, soll durch einen Raspberry Pi über eine Website gesteuert werden. Sie ermöglicht es, klimatische Bedingungen manuell oder automatisch mittels einer Live Wetter API einzustellen.

Der Hauptzweck dieser Klimakammer liegt in der Produktverifizierung. Klimakammern sind essentiell für statische Klimaprüfungen, Klimawechseltests und insbesondere für den Nachweis der Funktionsfähigkeit von Produkten unter spezifischen klimatischen Bedingungen. Solche Tests sind üblicherweise nicht Teil der Standardlaborprüfungen, sondern erfolgen am Ende der Produktentwicklung unter realen Bedingungen. Nicht bestandene Verifikationstests können zu einem Neustart der Produktentwicklung führen. Daher soll die Entwicklung der Klimakammer dazu beitragen, solche Risiken zu minimieren, indem praxisnahe Umweltprüfungen frühzeitig im Labor durchgeführt werden können.

Zur Steuerung der Kammer dient eine Website. Dieses Repository behandelt das Frontend der Website.

[Documentation](https://linktodocumentation)

## Features

- Übersicht über alle eingebauten Regelkreise
  - Soll/Ist Vergleich
  - Graphische Auswertung
  - Live Messwerte mit einstellbarer Abtastperiode
- Erstellung von Routinen
  - Abläufe erstellen z.B. in 10 Minuten Regen
- Manuelle Steuerung
  - Ändert den Sollwert eines Parameters vor allem für Debugging Zwecke
- Steuerung der Kammer mittels Wetter API
  - Echte Wetterdaten aus aller Welt können auf die Kammer angewandt werden mit vernachlässigbarem Codeaufwand.

## Screenshots

Startseite der Website:
![Startseite der Website](hWebsiteBilder\Übersicht25_12.png)
da keine Abläufe definiert sind, ist nur der derzeitig gemossene Wert zu sehen.
![Startseite wenn Aktionen definiert sind](hWebsiteBilder\Übersichtfilled25_12.png)

## Danksagung

- [WolfVision](https://wolfvision.com/de)
- [SANLight](https://www.sanlight.com/)
- [HTL Rankweil](https://www.htl-rankweil.at/)
