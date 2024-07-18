import React from 'react'

const About = () => {
  return (
    <div className='flex flex-col mt-14'>
        <div className='flex justify-center'>
            <h1 className='font-bold text-2xl text-blue-800'>What is <span className='font-bold text-cyan-500'>ScS ??</span></h1>
        </div>
        <div className=' ml-52 mt-3 w-2/3 max-w'>
                <h1>Lorem Ipsum is simply dummy text of the printing and 
                    typesetting industry. Lorem Ipsum has been the industry's standard 
                    dummy text ever since the 1500s, when an unknown printer took a galley
                     of type and scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic typesetting,
                       remaining essentially unchanged. It was popularised in the 1960s with
                        the release of Letraset sheets containing Lorem Ipsum passages, and more
                         recently with desktop publishing software like Aldus PageMaker including 
                         versions of Lorem Ipsum.It is a long established fact that a reader will be
                          distracted by the readable content of a page when looking at its layout.
                           The point of using Lorem Ipsum is that it has a more-or-less normal d
                           istribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                </h1>
        </div>
        <div className='flex justify-center'>
            <div>
            <img className='rounded-s-3xl w-80 h-52' src="https://mir-s3-cdn-cf.behance.net/projects/404/b2a698115941301.Y3JvcCwxMDY4LDgzNiw5Miww.jpg" alt="" />
            </div>
            <div>
            <button className='rounded-3xl text-white bg-black w-40 h-10 mt-24 ml-6'>Enroll Now</button>
            </div>
        </div>
         

    </div>
  )
}

export default About