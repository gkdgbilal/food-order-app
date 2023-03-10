import Image from "next/legacy/image"
import Title from "./ui/Title"
import { MdShoppingCart } from "react-icons/md"

const CampaignItem = () => {
  return (
    <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
      <div className="relative md:w-44 w-36 md:h-44 h-36 after:content-[''] border-[5px] border-primary rounded-full overflow-hidden">
        <Image
          alt="Campaign Image"
          src="/images/o1.jpg"
          layout="fill"
          className="hover:scale-105 transition-all duration-300"
          priority
        />
      </div>
      <div className="text-white">
        <Title addClass="text-2xl">Tasty Thursday</Title>
        <div className="font-dancing">
          <span className="text-[40px]">20%</span>
          <span className="text-sm inline-block ml-1">Off</span>
        </div>
        <button className="btn-primary flex items-center gap-x-2">
          Order Now <MdShoppingCart size={20}/>
        </button>
      </div>
    </div>
  )
}

const Campaigns = () => {
  return (
    <div className="flex justify-between container mx-auto py-20 gap-6 flex-wrap">
      <CampaignItem />
      <CampaignItem />
    </div>
  )
}

export default Campaigns