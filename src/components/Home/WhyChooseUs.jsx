import React from 'react'
import people from '../../images/Home/people.svg'
import prvt from '../../images/Home/private.svg'
import prvcy from '../../images/Home/privacy.svg'

const WhyChooseUs = () => {
  return (
    <div className='py-8 px-10'>

        <div className='my-4 text-black font-bold text-4xl text-center'>
            Why Choose Us
        </div>

        <div className='w-full my-10 flex flex-col md:flex-row justify-between items-start'>
            <Box img={people} title={"100% Personalised profile"} desc={"Discover profiles tailored to your location, interests, community and a variety of other filters."}/>

            <Box img={prvt} title={" 100% Verified profiles"} desc={"Get access to verified profiles only"}/>

            <Box img={prvcy} title={"Control over privacy"} desc={"Controll who can see your contact details."}/>

        </div>
      
    </div>
  )
}

export default WhyChooseUs


const Box = ({img,title,desc}) => {

    return (
        <div className='mx-4 w-full px-4 md:w-[33%] flex flex-col items-center justify-center'>
            <img src={img} alt="svg" />
            <div className='text-black font-bold text-xl'>{title}</div>
            <div className='text-black text-lg text-center'>{desc}</div>
        </div>
    )


}
