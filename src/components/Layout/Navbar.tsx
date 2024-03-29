import Image from "next/image"
export default function Layout() {
    return (
            <div className="flex flex-col pb-4 bg-white">
              <div className="flex flex-col justify-center items-end px-16 py-3 w-full text-xs bg-white text-zinc-800 max-md:px-5 max-md:max-w-full">
                <div className="flex gap-5 pl-3.5">
                  <div className="justify-center py-0.5 whitespace-nowrap">Help</div>
                  <div className="justify-center py-0.5">Orders & Returns</div>
                  <div className="justify-center p-0.5 text-right">Hi, John</div>
                </div>
              </div>
              <div className="flex gap-5 items-start self-center px-5 mt-3.5 w-full max-w-[1360px] max-md:flex-wrap max-md:max-w-full">
                <div className="flex-auto text-3xl font-bold text-black">ECOMMERCE</div>
                <div className="flex gap-5 self-stretch my-auto text-base font-semibold text-black max-md:flex-wrap">
                  <div className="grow">Categories</div>
                  <div>Sale</div>
                  <div>Clearance</div>
                  <div>New stock</div>
                  <div>Trending</div>
                </div>
                {/* <div className="flex gap-5 justify-between">
                  <Image
                  alt="icon"
                    loading="lazy"
                    width={50}
                    height={50}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b935d4b7e33fbd63a99e0449d2325b9d0c12eaf8e4965807af4be89681c6fb64?apiKey=49d596f4f92e4418b3262d30b38a2a9f&"
                    className="shrink-0 w-8 aspect-square"
                  />
                  <Image
                    alt="icon"
                    loading="lazy"
                    width={50}
                    height={50}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7b5a1d1ea050cd8214a3c6b75f35155739321540846412f1523e93187ba89f96?apiKey=49d596f4f92e4418b3262d30b38a2a9f&"
                    className="shrink-0 w-8 aspect-square"
                  />
                </div> */}
              </div>
            </div>
    )
  }