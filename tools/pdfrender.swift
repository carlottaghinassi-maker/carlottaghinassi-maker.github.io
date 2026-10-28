import PDFKit
import AppKit
// usage: pdfrender in.pdf outprefix maxWidth [pages...]
let a = CommandLine.arguments
let doc = PDFDocument(url: URL(fileURLWithPath: a[1]))!
let maxW = CGFloat(Double(a[3])!)
if a.count > 4 && a[4] == "count" { print(doc.pageCount); exit(0) }
var pages = a.count > 4 ? a[4...].map { Int($0)! - 1 } : Array(0..<doc.pageCount)
if a.count > 4 && a[4] == "count" { print(doc.pageCount); exit(0) }
for i in pages {
  let p = doc.page(at: i)!
  let r = p.bounds(for: .mediaBox)
  let s = min(maxW / r.width, 6000 / r.height)
  let w = Int(r.width * s), h = Int(r.height * s)
  let rep = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: w, pixelsHigh: h, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0)!
  let ctx = NSGraphicsContext(bitmapImageRep: rep)!
  NSGraphicsContext.current = ctx
  let cg = ctx.cgContext
  cg.setFillColor(NSColor.white.cgColor); cg.fill(CGRect(x: 0, y: 0, width: w, height: h))
  cg.scaleBy(x: s, y: s)
  p.draw(with: .mediaBox, to: cg)
  ctx.flushGraphics()
  try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(a[2])-\(i+1).png"))
}
