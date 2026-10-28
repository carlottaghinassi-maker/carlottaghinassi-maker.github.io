import Vision
import CoreImage
import AppKit
// usage: lift in.(png|jpg) out.png  — scontorna i soggetti in primo piano
let input = CIImage(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1]), options: [.applyOrientationProperty: true])!
let req = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: input)
try handler.perform([req])
guard let r = req.results?.first else { print("nessun soggetto"); exit(1) }
let buf = try r.generateMaskedImage(ofInstances: r.allInstances, from: handler, croppedToInstancesExtent: true)
let ci = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
let cg = ctx.createCGImage(ci, from: ci.extent)!
let rep = NSBitmapImageRep(cgImage: cg)
try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: CommandLine.arguments[2]))
print("ok", cg.width, cg.height, r.allInstances.count)
