export function SiteFooter({ className = "w-full bg-gray-100 mt-auto" }: { className?: string }) {
  return (
    <footer className={className}>
      
      <div className="px-4 py-6 md:hidden">
        <div className="flex flex-col items-center gap-6 mb-6">
          
          <div className="w-full max-w-md grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
            <div className="flex flex-col gap-1">
              <a href="#" className="text-[#002586] hover:underline">
                CMS Transparency in Coverage Files
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Contact Us
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Feedback
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Protect Yourself From Website Fraud
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Health & Insurance
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <a href="#" className="text-[#002586] hover:underline">
                Wayfinder
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Savings & Retirement
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Life Changes
              </a>
              <a href="#" className="text-[#002586] hover:underline">
                Other Benefits
              </a>
            </div>
          </div>

          
          <div className="flex flex-col items-center gap-3">
            <img src="/alight_worklife__logo_black_2x.png" alt="alight worklife" className="w-[200px] h-[36px]" />
            <div className="flex gap-3">
              <a href="#" className="block">
                <img src="/app-store-badge.png" alt="Download on the App Store" className="h-10" />
              </a>
              <a href="#" className="block">
                <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 my-4" />
        <div className="text-center text-xs text-gray-600 space-y-2">
          <p className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <a href="#" className="text-[#002586] hover:underline">Privacy Policy</a>
            <a href="#" className="text-[#002586] hover:underline">Terms Of Use</a>
            <a href="#" className="text-[#002586] hover:underline">Cookie Notice</a>
            <a href="#" className="text-[#002586] hover:underline">Cookie Settings [Do Not Sell or Share My Personal Information]</a>
          </p>
          <p className="text-gray-500">©2026 Alight Solutions. All rights reserved.</p>
        </div>
      </div>

      
      <div className="hidden md:block px-8 lg:px-12 py-8 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="text-[#002586] hover:underline">CMS Transparency in Coverage Files</a>
              <a href="#" className="text-[#002586] hover:underline">Contact Us</a>
              <a href="#" className="text-[#002586] hover:underline">Feedback</a>
              <a href="#" className="text-[#002586] hover:underline">Protect Yourself From Website Fraud</a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="text-[#002586] hover:underline">Health & Insurance</a>
              <a href="#" className="text-[#002586] hover:underline">Wayfinder</a>
              <a href="#" className="text-[#002586] hover:underline">Savings & Retirement</a>
              <a href="#" className="text-[#002586] hover:underline">Life Changes</a>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="#" className="text-[#002586] hover:underline">Other Benefits</a>
            </div>
            <div className="flex flex-col items-end gap-3 shrink-0 ml-auto">
              <img src="/alight_worklife__logo_black_2x.png" alt="alight worklife" className="w-[230px] h-[40px]" />
              <div className="flex gap-3">
                <a href="#" className="block">
                  <img src="/app-store-badge.png" alt="Download on the App Store" className="h-10" />
                </a>
                <a href="#" className="block">
                  <img src="/google-play-badge.png" alt="Get it on Google Play" className="h-10" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 my-6" />
          
          <div className="flex items-center justify-between flex-wrap gap-4 text-xs text-gray-600">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <a href="#" className="text-[#002586] hover:underline">Privacy Policy</a>
              <a href="#" className="text-[#002586] hover:underline">Terms Of Use</a>
              <a href="#" className="text-[#002586] hover:underline">Cookie Notice</a>
              <a href="#" className="text-[#002586] hover:underline">Cookie Settings [Do Not Sell or Share My Personal Information]</a>
            </p>
            <p className="text-gray-500 shrink-0">©2026 Alight Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
