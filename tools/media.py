import os, sys, json, subprocess, shutil, tempfile
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
X = sys.argv[1]; OUT = sys.argv[2]
# Terzo argomento opzionale: solo questi slug (separati da virgola), uniti al media.json esistente.
ONLY = sys.argv[3].split(',') if len(sys.argv) > 3 else None
S = X + '/src'; SC = X + '/scripts'
MAXW = 2200
# slug -> [(source relative to src, output basename, kind)]
M = {
 'te-fini-hai-finito': [
  ('tesi/TESI/cotolette.mp4','spread-cotolette','vid'),
  ('tesi/TESI/3d tesi/cappelletti rosa -3.mp4','3d-cappelletti-rosa','vid'),
  ('pdf:tesi/TESI/testo.pdf#21','booklet-ventaglio','img'),
  ('pdf:tesi/TESI/testo.pdf#22','booklet-serie','img'),
  ('pdf:tesi/TESI/testo.pdf#5','ricerca-fotografica-1','img'),
  ('pdf:tesi/TESI/testo.pdf#6','ricerca-fotografica-2','img'),
  ('pdf:tesi/TESI/testo.pdf#9','moodboard','img'),
  ('pdf:tesi/TESI/testo.pdf#13','tipografia','img'),
  ('pdf:tesi/TESI/testo.pdf#17','disegni-copertina','img'),
  ('pdf:tesi/TESI/testo.pdf#25','covers','img'),
  ('pdf:tesi/TESI/testo.pdf#26','grazie','img'),
 ] + [(f'tesi/TESI/3d tesi/{n}.mp4', '3d-'+k, 'vid') for n,k in [
  ('cappelletti verdi','cappelletti-verdi'),('garganell-2','garganelli'),('lasagne','lasagne'),
  ('pollo arrosto','pollo-arrosto'),('coniglio al sugo','coniglio'),('cotolette','cotolette'),
  ('rane','rane'),('latte broulet','latte-broulet'),('crema','crema'),('crostata di ciliegie-2','crostata'),('torta di mele ','torta-di-mele')]]
  + [(f'tesi/TESI/{n}.mp4','spread-'+k,'vid') for n,k in [
  ('cappelletti 1','cappelletti-1'),('cappelletti 2','cappelletti-2'),('garganelli','garganelli'),('lasagne','lasagne'),
  ('arrosto','arrosto'),('coniglio al sugo','coniglio'),('rane','rane'),('latte broulet','latte-broulet'),
  ('la crema','crema'),('crostata','crostata'),('torta di mele','torta-di-mele')]],
 'soglie-thresholds': [
  ('soglia/SOGLIA/07_esecutivo_icona.png','icona','img'),
  ('soglia/SOGLIA/IMG_9954.HEIC','vetrina','img'),
  ('soglia/SOGLIA/fragola giustoooo.png','leporello-fragola','img'),
  ('soglia/SOGLIA/pollo leporello_ giusto.png','leporello-pollo','img'),
  ('pdf:soglia/SOGLIA/5.pdf#1','fragola-giorni','img'),
  ('pdf:soglia/SOGLIA/4.pdf#1','pollo-giorni','img'),
  ('soglia/SOGLIA/IMG_9941.HEIC','vetrina-esterno','img'),
  ('soglia/SOGLIA/IMG_9940.HEIC','cartello','img'),
  ('soglia/SOGLIA/IMG_9920.HEIC','allestimento-1','img'),
  ('soglia/SOGLIA/IMG_9924.HEIC','allestimento-2','img'),
  ('soglia/SOGLIA/IMG_9915.HEIC','allestimento-3','img'),
  ('soglia/SOGLIA/IMG_9916.HEIC','allestimento-4','img'),
  ('soglia/SOGLIA/IMG_9952.HEIC','allestimento-5','img'),
  ('soglia/SOGLIA/IMG_9911.HEIC','allestimento-6','img'),
  ('soglia/SOGLIA/IMG_0629.JPG','leporello-mano','img'),
 ],
 'ovora': [
  ('_dsc5937-png/_DSC5937.png','borsa-blu','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#1','logo','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#33','foto-1','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#31','foto-2','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#32','foto-3','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#35','foto-4','img'),
  ('_dsc5937-png/_DSC6015.jpg','borsa-marrone','img'),
  ('_dsc5937-png/2.png','tag-marrone','img'),
  ('_dsc5937-png/Untitled-7.png','tag-blu','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#4','simbolo','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#15','logo-marrone','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#16','palette','img'),
  ('_dsc5937-png/Screenshot 2026-06-01 alle 23.14.06.png','font','img'),
  ('pdf:_dsc5937-png/Frame 1.pdf#1','etichetta-albume-blu','img'),
  ('_dsc5937-png/Frame 2.png','etichetta-albume-marrone','img'),
  ('pdf:_dsc5937-png/6 UOVA.pdf#1','etichetta-6-uova-blu','img'),
  ('pdf:_dsc5937-png/MARRONE.pdf#1','etichetta-6-uova-marrone','img'),
  ('pdf:_dsc5937-png/A4 - 5.pdf#1','fascia-blu','img'),
  ('pdf:_dsc5937-png/GIUSTO MARRONE .pdf#1','fascia-marrone','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#25','sticker','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#26','packaging-aperto','img'),
  ('pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#27','packaging-terra','img'),
 ],
 'lisola-doro': [
  ('6-pdf/DSC08496.png','barattolo','img'),
  ('6-pdf/computer.png','computer','img'),
  ('6-pdf/DSC08496.jpg','foto-1','img'),
  ('6-pdf/DSC08498.jpg','foto-2','img'),
  ('6-pdf/DSC08502.jpg','foto-3','img'),
  ('6-pdf/DSC08506.jpg','foto-4','img'),
  ('6-pdf/DSC08537.jpg','foto-5','img'),
  ('6-pdf/DSC08545.jpg','tappo','img'),
  ('pdf:6-pdf/file di lavoro.pdf#1','logotipo','img'),
  ('pdf:6-pdf/8.pdf#1','etichetta-seppia','img'),
  ('pdf:6-pdf/9.pdf#1','etichetta-vongolotte','img'),
  ('pdf:6-pdf/7.pdf#1','etichetta-aliciotte','img'),
  ('6-pdf/Screenshot 2026-04-25 alle 16.57.33.png','prima-seppia','img'),
  ('6-pdf/Screenshot 2026-04-25 alle 16.57.44.png','prima-vongolotte','img'),
  ('6-pdf/Screenshot 2026-04-26 alle 14.42.37.png','prima-aliciotte','img'),
  ('6-pdf/jowinski_mockup_card.png','biglietto-1','img'),
  ('6-pdf/back card.png','biglietto-2','img'),
  ('6-pdf/POST IG-15.png','biglietti-tavolo','img'),
  ('pdf:6-pdf/11.pdf#1','marchio','img'),
 ],
 'dolly-noire-stamp': [
  ('dolly-stamp/DOLLY STAMP/dlynr.mp4','stamp-animato','vid'),
  ('dolly-stamp/DOLLY STAMP/ig post -04.png','pattern-foto','img'),
  ('dolly-stamp/DOLLY STAMP/ig post -01.png','stamp','img'),
  ('dolly-stamp/DOLLY STAMP/back nero.png','tee-nera-retro','img'),
  ('dolly-stamp/DOLLY STAMP/front nero.png','tee-nera-fronte','img'),
  ('dolly-stamp/DOLLY STAMP/bianco su bianco back.png','tee-bianca-retro','img'),
  ('dolly-stamp/DOLLY STAMP/front bianco.png','tee-bianca-fronte','img'),
  ('pdf:dolly-stamp/DOLLY STAMP/pattern.pdf#1','pattern-1','img'),
  ('pdf:dolly-stamp/DOLLY STAMP/pattern 2pdf.pdf#1','pattern-2','img'),
 ] + [(f'dolly-stamp/DOLLY STAMP/MOOD BOARD/{n}', f'moodboard-{i+1}', 'img') for i,n in enumerate(
   [' -15.jpg',' -16.jpg',' -17.jpg',' -18.jpg',' -19.jpg',' -20.jpg','s-l400.jpg','s-l400.png'])],
 'dolly-noire-pack': [
  ('dolly-pack/DOLLY PACK/pack vettorialeai.png','pack','img'),
  ('dolly-pack/DOLLY PACK/blu.png','tee-blu','img'),
  ('dolly-pack/DOLLY PACK/front verticale.png','tee-bianca','img'),
 ] + [(f'dolly-pack/DOLLY PACK/MOOD BOARD PACK/{n}', f'moodboard-{i+1}', 'img') for i,n in enumerate(
   ['Avon Pluto Shampoo Box.jpg','Vintage bubble gum cigarettes.jpg',' -21.jpg',' -22.jpg','7838563822_15ace012cd_o.jpg','Screenshot 2026-03-09 alle 18.03.27.png'])],
 'about': [
  ('WhatsApp Image 2026-10-26 at 15.05.15.jpeg','fototessera','img'),
  ('WhatsApp Image 2026-10-26 at 15.02.57.jpeg','logo-no-giallo','img'),
  ('WhatsApp Image 2026-10-26 at 15.02.57 (1).jpeg','logo-no-nero','img'),
 ],
 'archivio': [
  (f'tesi/TESI/export duble/cappelletti ma/A4 CAPPELLETTI MARILENA{n}.png', f'cappelletti-{n or 1}', 'img') for n in ['', '2','3','4','5','8','9','10']
 ] + [
  (f'tesi/TESI/export duble/lasagne lu/A4 LASAGENE LUCIANA copia{n}.png', f'lasagne-{n or 1}', 'img') for n in ['', '2','3','4','5','8','9','10']
 ],
}

import glob, re as _re
def _pages(folder):
    fs = [f for f in glob.glob(os.path.join(S, folder, '*.png'))]
    stems = [os.path.basename(f)[:-4] for f in fs]
    pre = os.path.commonprefix(stems)
    num = lambda f: int(os.path.basename(f)[len(pre):-4].strip() or 1)
    return sorted(fs, key=num), num
BOOKLETS = [('cappelletti ma','cappelletti-marilena'),('cappelletti lu','cappelletti-luciana'),('garganelli ma','garganelli-marilena'),('lasagne lu','lasagne-luciana'),
  ('pollo arrosto lu','pollo-arrosto-luciana'),('coniglio ma','coniglio-marilena'),('cotolette lu','cotolette-luciana'),('rane ma','rane-marilena'),
  ('torta di mele lu','torta-di-mele-luciana'),('crostata lu','crostata-luciana'),('latte broulet ma','latte-broulet-marilena'),('la crema ma','crema-marilena')]
for folder, key in BOOKLETS:
    fs, num = _pages(f'tesi/TESI/export duble/{folder}')
    for f in fs:
        M['te-fini-hai-finito'].append((os.path.relpath(f, S), f'booklet-{key}-{num(f):02d}', 'img', 1400))
M['lisola-doro'] += [
  ('6-pdf/DSC08538.jpg','foto-6','img'),
  ('6-pdf/mod card front.png','biglietto-fronte','img'),
  ('6-pdf/back card mod.png','biglietto-retro','img'),
  ('pdf:6-pdf/6.pdf#1','etichetta-vongolotte-piatta','img'),
  ('pdf:6-pdf/aliciotte.pdf#1','etichetta-aliciotte-piatta','img'),
]
M['about'] += [('cv/cv/CV ITA.png','cv-ita','img',1600), ('cv/cv/cv  english.png','cv-english','img',1600)]
M['archivio'] = (
  [(f'pdf:tesi/TESI/testo.pdf#{i}', f'tesi-{i:02d}', 'img', 1600) for i in range(1, 27)] +
  [(f'pdf:_dsc5937-png/Presentazione finale OVORA_Ghinassi_Masetti_GraficaIII.pdf#{i}', f'ovora-{i:02d}', 'img', 1600) for i in range(1, 39)] +
  [(f'pdf:6-pdf/TESTO .pdf#{i}', f'isola-{i:02d}', 'img', 1600) for i in range(1, 30)] +
  [('pdf:_dsc5937-png/OVORA.pdf#1','brief-ovora','img',1600), ('pdf:soglia/SOGLIA/SOGLIE7THRESHOLD.pdf#1','brief-soglie','img',1600),
   ('pdf:dolly-stamp/DOLLY STAMP/dolly noire .pdf#1','brief-dolly-noire','img',1600)]
)
M['farcito'] = (
  [('FARCITO/FARCITO_file stampa_ t-shirt _Tavola disegno 1.png','tee-01','img',1600)] +
  [(f'FARCITO/FARCITO_file stampa_ t-shirt -{i:02d}.png', f'tee-{i:02d}', 'img', 1600) for i in range(2, 21)] +
  [('FARCITO/cocktail e brioshe- 3 BOZZA.png','illustrazione','img'),
   ('FARCITO/briosche in bianco.png','cornetto','img'),
   (os.path.relpath(glob.glob(os.path.join(S, 'FARCITO', 'caff*in bianco_.png'))[0], S),'caffe','img'),
   ('FARCITO/0b8a9ee0-6ed4-49a3-9bcc-ecc5436068be.JPG','foto-1','img'),
   ('FARCITO/2f66c85e-ce85-4a0e-b163-d67f3261fae5.JPG','foto-2','img'),
   ('FARCITO/165c00b7-e59c-46e8-a99e-198e04461cf9.jpg','foto-3','img')]
)
FX = 'FOTO X MIKE'
M['fotografia-analogica'] = (
  [(f'{FX}/imgg725.JPG','mostra-foto','img'), (f'{FX}/CB03CCE8-F7C0-4B7D-9DF6-2DE742BD326A.JPG','mostra-locandina','img'),
   (f'{FX}/IMG_1795.PNG','mostra-artista','img'), (f'{FX}/IMG_6877.jpg','mostra-sala','img')] +
  # PICT0022.JPG e PICT0022-Edit.PNG sono lo stesso scatto: si usa la versione lavorata.
  [(os.path.relpath(f, S), f'giappone-{i+1:02d}', 'img', 1600) for i, f in enumerate(sorted(
     f for f in glob.glob(os.path.join(S, FX, 'giappone', '*')) if os.path.basename(f) != 'PICT0022.JPG'))] +
  [(os.path.relpath(f, S), f'tesi-{i+1:02d}', 'img', 1600) for i, f in enumerate(sorted(glob.glob(os.path.join(S, FX, 'FOTO TESI', '*'))))] +
  [(os.path.relpath(f, S), f'sperimentazione-{i+1}', 'img', 1600) for i, f in enumerate(sorted(glob.glob(os.path.join(S, FX, 'SPERIMENTAZIONE', '*'))))]
)
M['archivio'].append(('pdf:FARCITO/farcito.pdf#1','brief-farcito','img',1600))
if ONLY:
    # `archivio:brief-farcito` = solo quell'immagine della cartella.
    sel = {}
    for o in ONLY:
        k, _, name = o.partition(':'); sel.setdefault(k, set()).add(name)
    M = {k: [it for it in v if '' in sel[k] or it[1] in sel[k]] for k, v in M.items() if k in sel}

tmp = tempfile.mkdtemp()
# Ritagli (frazioni l, t, r, b) per togliere indici e titoli delle slide di presentazione.
CROPS = {
 ('ovora','foto-1'):(0,0,.835,.95), ('ovora','foto-2'):(0,0,.835,.95), ('ovora','foto-3'):(0,0,.835,.95), ('ovora','foto-4'):(0,0,.835,.95),
  ('ovora','sticker'):(0,.05,.80,.93),
 ('ovora','packaging-aperto'):(.02,.15,.80,.94), ('ovora','packaging-terra'):(.02,.15,.80,.94),
 ('ovora','logo'):(.06,.1,.94,.9), ('ovora','logo-marrone'):(.08,.1,.82,.9), ('ovora','palette'):(0,0,.82,.94),
 ('te-fini-hai-finito','booklet-serie'):(0,.1,1,.92), ('te-fini-hai-finito','booklet-ventaglio'):(.1,.12,.92,.92),
 ('te-fini-hai-finito','covers'):(0,.1,1,.92), ('te-fini-hai-finito','disegni-copertina'):(.2,.08,.82,.92),
 ('te-fini-hai-finito','ricerca-fotografica-1'):(0,.17,1,.61), ('te-fini-hai-finito','ricerca-fotografica-2'):(0,.17,1,.61),
 ('te-fini-hai-finito','moodboard'):(0,.08,1,.95), ('te-fini-hai-finito','tipografia'):(0,.08,1,.92),
}
AUTOCROP = {'barattolo','etichetta-seppia','etichetta-vongolotte','etichetta-aliciotte','etichetta-vongolotte-piatta','etichetta-aliciotte-piatta','pack','tee-blu','tee-bianca','stamp','marchio','logotipo'}
meta = json.load(open(os.path.join(OUT, 'media.json'))) if ONLY else {}
def save(im, out, maxw=MAXW):
    if im.mode in ('RGBA','LA','P'):
        im = im.convert('RGBA'); bg = Image.new('RGB', im.size, 'white'); bg.paste(im, mask=im.split()[3]); im = bg
    else: im = im.convert('RGB')
    if im.width > maxw: im = im.resize((maxw, round(im.height*maxw/im.width)), Image.LANCZOS)
    im.save(out, 'JPEG', quality=80, optimize=True, progressive=True)
    return im.size
for slug, items in M.items():
    d = os.path.join(OUT, slug); os.makedirs(d, exist_ok=True); meta.setdefault(slug, {})
    for i,it in enumerate(items):
        src, name, kind = it[:3]; maxw = it[3] if len(it) > 3 else MAXW
        if kind == 'vid':
            out = os.path.join(d, name + '.mp4')
            p = os.path.join(S, src)
            if not os.path.exists(out):
                if os.path.getsize(p) > 3_000_000:
                    subprocess.run(['avconvert','-s',p,'-p','Preset960x540','-o',out,'--replace'], check=True, capture_output=True)
                else: shutil.copy(p, out)
            poster = os.path.join(d, name + '.jpg')
            subprocess.run([SC+'/frame', out, poster], check=True, capture_output=True)
            im = Image.open(poster); w,h = im.size
            meta[slug][name] = {'type':'video','src':f'{slug}/{name}.mp4','poster':f'{slug}/{name}.jpg','w':w,'h':h}
            continue
        out = os.path.join(d, name + '.jpg')
        if src.startswith('pdf:'):
            f, pg = src[4:].split('#')
            pre = os.path.join(tmp, name)
            subprocess.run([SC+'/pdfrender', os.path.join(S,f), pre, str(maxw), pg], check=True, capture_output=True)
            im = Image.open(f'{pre}-{pg}.png')
        elif src.lower().endswith('.heic'):
            t = os.path.join(tmp, name + '.jpg')
            subprocess.run(['sips','-s','format','jpeg','-Z',str(MAXW),os.path.join(S,src),'--out',t], check=True, capture_output=True)
            from PIL import ImageOps; im = ImageOps.exif_transpose(Image.open(t))
        else:
            im = Image.open(os.path.join(S, src))
            from PIL import ImageOps; im = ImageOps.exif_transpose(im)
        if (slug, name) in CROPS:
            l,t_,r,b = CROPS[(slug, name)]
            im = im.crop((int(l*im.width), int(t_*im.height), int(r*im.width), int(b*im.height)))
        if name in AUTOCROP:
            from PIL import ImageChops
            rgb = im.convert('RGBA'); bg = Image.new('RGBA', rgb.size, (255,255,255,255)); bg.alpha_composite(rgb)
            diff = ImageChops.difference(bg.convert('RGB'), Image.new('RGB', rgb.size, 'white')).convert('L').point(lambda v: 255 if v > 12 else 0)
            l,t_,r,b = diff.getbbox(); pad = int(max(r-l, b-t_) * (0.04 if name.startswith('etichetta') else 0.18))
            im = im.crop((max(0,l-pad), max(0,t_-pad), min(im.width,r+pad), min(im.height,b+pad)))
        w,h = save(im, out, maxw)
        meta[slug][name] = {'type':'image','src':f'{slug}/{name}.jpg','w':w,'h':h}
        print(slug, name, w, h, flush=True)
json.dump(meta, open(os.path.join(OUT, 'media.json'),'w'), indent=1)
