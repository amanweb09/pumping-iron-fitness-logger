import { Dumbbell } from 'lucide-react'

const SplashScreen = () => {
  return (
    <div className='w-full h-screen bg-black flex-center flex-col'>
        <Dumbbell color='#fff' className='w-12' />
        <span className='text-gray-100 font-bold mt-2 blink'><span className="text-lime-200">Awesomeness</span> Loading!</span>
    </div>
  )
}

export default SplashScreen