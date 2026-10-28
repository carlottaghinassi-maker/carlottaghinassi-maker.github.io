import AVFoundation
import AppKit
let a = AVURLAsset(url: URL(fileURLWithPath: CommandLine.arguments[1]))
let g = AVAssetImageGenerator(asset: a); g.appliesPreferredTrackTransform = true
let d = CMTimeGetSeconds(a.duration)
let t = CMTime(seconds: d*0.4, preferredTimescale: 600)
let cg = try! g.copyCGImage(at: t, actualTime: nil)
let rep = NSBitmapImageRep(cgImage: cg)
try! rep.representation(using: .jpeg, properties: [.compressionFactor: 0.6])!.write(to: URL(fileURLWithPath: CommandLine.arguments[2]))
print(CommandLine.arguments[1].split(separator:"/").last!, cg.width, cg.height, String(format:"%.1fs",d))
