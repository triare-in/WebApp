"""Generates ANSI layout JSON (65 / 75 / 100). Units: 1u = 19.05 mm. Origin top-left."""
import json
from pathlib import Path

def a(i, l=None): return (i, l or i.upper(), 1, "alpha")
def m(i, l, w=1, role="mod"): return (i, l, w, role)
def K(i, l, x, y, w=1, h=1, role="mod"):
    return dict(id=i, label=l, x=round(x, 3), y=round(y, 3), w=w, h=h, role=role)
def letters(s): return [a(c.lower(), c) for c in s]

def place(y, x0, spec):
    x, out = x0, []
    for i, l, w, role in spec:
        out.append(K(i, l, x, y, w, 1, role)); x += w
    return out

NUM = [a(str(d), str(d)) for d in "1234567890"]
NUMROW = [a("grave", "`")] + NUM + [a("minus", "-"), a("equal", "="), m("bksp", "Bksp", 2)]
TABROW = [m("tab", "Tab", 1.5)] + letters("QWERTYUIOP") + [a("lbracket", "["), a("rbracket", "]"), a("bslash", "\\")]
TABROW[-1] = ("bslash", "\\", 1.5, "alpha")
CAPSROW = [m("caps", "Caps", 1.75)] + letters("ASDFGHJKL") + [a("semicolon", ";"), a("quote", "'"), m("enter", "Enter", 2.25, "accent")]
def shiftrow(rw): return [m("lshift", "Shift", 2.25)] + letters("ZXCVBNM") + [a("comma", ","), a("period", "."), a("slash", "/"), m("rshift", "Shift", rw)]
BOTTOM_COMPACT = [m("lctrl", "Ctrl", 1.25), m("lwin", "Win", 1.25), m("lalt", "Alt", 1.25), m("space", "", 6.25, "alpha"),
                  m("ralt", "Alt"), m("fn", "Fn"), m("rctrl", "Ctrl")]
BOTTOM_FULL = [m("lctrl", "Ctrl", 1.25), m("lwin", "Win", 1.25), m("lalt", "Alt", 1.25), m("space", "", 6.25, "alpha"),
               m("ralt", "Alt", 1.25), m("rwin", "Win", 1.25), m("menu", "Menu", 1.25), m("rctrl", "Ctrl", 1.25)]

def layout65():
    nr = [m("esc", "Esc", 1, "accent")] + NUMROW[1:]
    rows = [nr, TABROW, CAPSROW, shiftrow(1.75), BOTTOM_COMPACT]
    keys = []
    for r, spec in enumerate(rows): keys += place(r, 0, spec)
    keys += [K("del", "Del", 15, 0), K("pgup", "PgUp", 15, 1), K("pgdn", "PgDn", 15, 2),
             K("up", "↑", 14, 3), K("end", "End", 15, 3),
             K("left", "←", 13, 4), K("down", "↓", 14, 4), K("right", "→", 15, 4)]
    return "65%", 16, 5, keys

def layout75():
    keys = [K("esc", "Esc", 0, 0, role="accent")]
    keys += [K(f"f{n}", f"F{n}", n, 0) for n in range(1, 13)]
    keys += [K("prtsc", "PrtSc", 13, 0), K("ins", "Ins", 14, 0), K("del", "Del", 15, 0)]
    rows = [NUMROW, TABROW, CAPSROW, shiftrow(1.75), BOTTOM_COMPACT]
    for r, spec in enumerate(rows): keys += place(1.5 + r, 0, spec)
    y = 1.5
    keys += [K("home", "Home", 15, y), K("pgup", "PgUp", 15, y + 1), K("pgdn", "PgDn", 15, y + 2),
             K("up", "↑", 14, y + 3), K("end", "End", 15, y + 3),
             K("left", "←", 13, y + 4), K("down", "↓", 14, y + 4), K("right", "→", 15, y + 4)]
    return "75%", 16, 6.5, keys

def layout100():
    keys = [K("esc", "Esc", 0, 0, role="accent")]
    for x0, ns in ((2, range(1, 5)), (6.5, range(5, 9)), (11, range(9, 13))):
        for j, n in enumerate(ns): keys.append(K(f"f{n}", f"F{n}", x0 + j, 0))
    keys += [K("prtsc", "PrtSc", 15.25, 0), K("scrlk", "ScrLk", 16.25, 0), K("pause", "Pause", 17.25, 0)]
    rows = [NUMROW, TABROW, CAPSROW, shiftrow(2.75), BOTTOM_FULL]
    for r, spec in enumerate(rows): keys += place(1.5 + r, 0, spec)
    y = 1.5
    nav = [("ins", "Ins", 0, 0), ("home", "Home", 1, 0), ("pgup", "PgUp", 2, 0),
           ("del", "Del", 0, 1), ("end", "End", 1, 1), ("pgdn", "PgDn", 2, 1)]
    keys += [K(i, l, 15.25 + dx, y + dy) for i, l, dx, dy in nav]
    keys += [K("up", "↑", 16.25, y + 3), K("left", "←", 15.25, y + 4), K("down", "↓", 16.25, y + 4), K("right", "→", 17.25, y + 4)]
    kp = [("numlk", "Num", 0, 0, 1, 1), ("kpdiv", "/", 1, 0, 1, 1), ("kpmul", "*", 2, 0, 1, 1), ("kpsub", "-", 3, 0, 1, 1),
          ("kp7", "7", 0, 1, 1, 1), ("kp8", "8", 1, 1, 1, 1), ("kp9", "9", 2, 1, 1, 1), ("kpadd", "+", 3, 1, 1, 2),
          ("kp4", "4", 0, 2, 1, 1), ("kp5", "5", 1, 2, 1, 1), ("kp6", "6", 2, 2, 1, 1),
          ("kp1", "1", 0, 3, 1, 1), ("kp2", "2", 1, 3, 1, 1), ("kp3", "3", 2, 3, 1, 1), ("kpenter", "Enter", 3, 3, 1, 2),
          ("kp0", "0", 0, 4, 2, 1), ("kpdot", ".", 2, 4, 1, 1)]
    for i, l, dx, dy, w, h in kp:
        role = "accent" if i == "kpenter" else ("alpha" if i.startswith("kp") and i[2:].isdigit() else "mod")
        keys.append(K(i, l, 18.5 + dx, y + dy, w, h, role))
    return "100%", 22.5, 6.5, keys

def check(name, w, h, keys):
    ids = [k["id"] for k in keys]
    assert len(ids) == len(set(ids)), f"{name}: duplicate ids"
    e = 1e-6
    for k in keys:
        assert k["x"] >= -e and k["y"] >= -e and k["x"] + k["w"] <= w + e and k["y"] + k["h"] <= h + e, (name, k)
    for i, p in enumerate(keys):
        for q in keys[i + 1:]:
            if p["x"] < q["x"] + q["w"] - e and q["x"] < p["x"] + p["w"] - e and p["y"] < q["y"] + q["h"] - e and q["y"] < p["y"] + p["h"] - e:
                raise AssertionError(f"{name}: overlap {p['id']} / {q['id']}")
    return len(keys)

def dump(path, lid, name, w, h, keys):
    head = {"id": lid, "name": name, "standard": "ANSI", "unit_mm": 19.05, "width_u": w, "height_u": h, "key_count": len(keys)}
    body = ",\n".join("    " + json.dumps(k, ensure_ascii=False, separators=(", ", ": ")) for k in keys)
    hs = ",\n".join(f'  "{k}": {json.dumps(v)}' for k, v in head.items())
    path.write_text("{\n" + hs + ',\n  "keys": [\n' + body + "\n  ]\n}\n", encoding="utf-8")

if __name__ == "__main__":
    out = Path("/mnt/user-data/outputs/layouts")
    for lid, fn in (("ansi-65", layout65), ("ansi-75", layout75), ("ansi-100", layout100)):
        name, w, h, keys = fn()
        n = check(name, w, h, keys)
        dump(out / f"{lid}.json", lid, name, w, h, keys)
        print(f"{lid}: {n} keys, {w}u x {h}u = {w*19.05:.1f} x {h*19.05:.1f} mm")
