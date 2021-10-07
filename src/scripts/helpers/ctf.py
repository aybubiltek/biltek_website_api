import sys
import json
sys.stdout.flush()
f = open("/home/osman/Downloads/ctf_skor_23.txt", "r", encoding="utf-8")
x = f.read()

split = x.split("\n")

scores = []

for line in split:
    splitted_line = line.split(";")
    scores.append({"team_name": splitted_line[0], "score":splitted_line[1]})

print(json.dumps(scores),flush=True)

f = open("./src/scripts/helpers/scores.json", "w", encoding="utf-8")
f.write(json.dumps(scores))