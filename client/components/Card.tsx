import imgUrl from '../src/assets/placeholder.webp'


interface Card {
  name: string;
  email: string;
  phone: string;
  color: string;
  websiteLink: string;
  companyName: string;
  jobTitle: string;
  previewBackgroundImage?: string;
  previewImage?: string;
  handleVcfDownload?: () => void;
  showPhoneBackground?: false;
}

export default function Card({
  name,
  email,
  phone,
  color,
  websiteLink,
  companyName,
  jobTitle,
  previewBackgroundImage,
  previewImage,
  handleVcfDownload,
}: Card) {
  return (
    <div className="flex justify-center items-center virtual-card">
      <div className="w-[100%] max-w-[800px]">
        <div className="card bg-base-100 grow-1 w-[100%] h-[100%]">
          {previewBackgroundImage ? (
            <div className="h-80 relative">
              <img
                className="h-40 w-100 cover"
                src={previewBackgroundImage}
              ></img>
              <div
                className="absolute w-[100%] h-40 top-0 opacity-95"
                style={
                  color
                    ? { backgroundColor: color }
                    : { backgroundColor: "var(--color-secondary)" }
                }
              ></div>
            </div>
          ) : (
            <div
              className="h-60"
              style={
                color
                  ? { backgroundColor: color }
                  : { backgroundColor: "var(--color-secondary)" }
              }
            >
              <div className="flex flex-col items-start justify-center mt-20 ml-5">
                <h1 className="font-bold text-[24px] text-white">
                  {name ? name : "Cat Smith"}
                </h1>
                <div className="text-white">
                  {jobTitle ? jobTitle : "Software Developer"}
                </div>
                <div className="text-white" style={{fontStyle:"italic"}}>
                  {companyName ? companyName : "Dpi Power"}
                </div>
              </div>
            </div>
          )}

          <div className="mb-5">
            <div className="">
              <div
                className="flex justify-center items-center"
                style={{ background: "#f9f9f9" }}
              >
                <div className="flex flex-col items-center rounded-full mt-[-80px] p-4">
                  <div>
                    <img
                     className="w-[170px] h-[170px]" style={{borderRadius:"50%", objectFit:"cover"}}
                      src={
                        previewImage
                          ? previewImage
                          : imgUrl
                      }
                    />
                  </div>
                  <div className="mt-5">
                    <div className="font-bold">About Me</div>
                    <div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-5 m-5">
                <div className="card flex flex-col">
                  <div className="card-body flex-row items-center p-2">
                    <div className="bg-secondary rounded-[99px] p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Phone</p>
                      <p className="font-bold">
                        {phone ? phone : "423-552-5677"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card flex flex-col">
                  <div className="card-body flex-row items-center p-2">
                    <div className="bg-secondary rounded-[99px] p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Email</p>
                      <p className="font-bold">
                        {email ? email : "test@gmail.com"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card flex flex-col">
                  <div className="card-body flex-row items-center p-2">
                    <div className="bg-secondary rounded-[99px] p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                        />
                      </svg>
                    </div>
                    <div>
                      <p>Website</p>
                      <a className="font-bold" href="#">
                        {websiteLink ? websiteLink : "test.com"}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-actions justify-center">
                <button
                  onClick={handleVcfDownload}
                  className="btn btn-secondary mt-10 add-button-vcf"
                  style={{fontWeight:"normal", borderRadius:2}}
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
