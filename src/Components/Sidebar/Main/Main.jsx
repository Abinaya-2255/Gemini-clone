import { useContext } from 'react'
import { assets } from '../../../assets/assets'
import './Main.css'
import { Context } from '../../../Context/Context'

const Main = () => {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(Context)
    return(
        <div className= 'main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt=""/>
            </div>
            <div className="main-container">
                <div className="greet">
                  <p><span>Hello,Abby</span></p>
                  <p>How can I help you today?</p>  
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip</p>
                        <img src={assets.compass_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Explain this concept like I’m new to it</p>
                        <img src={assets.bulb_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Give me a few design ideas for this topic</p>
                        <img src={assets.code_icon} alt=""/>
                    </div>
                    <div className="card">
                        <p>Help me plan my day</p>
                        <img src={assets.message_icon} alt=""/>
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <p className="bottom-info">
                        Gemini is your intelligent companion that understands context, adapts to your style, and helps you get things done with clarity. Designed to feel natural, fast, and effortless.
                    </p>
                </div>
              
                
                </div>
            </div>
        
    )
}
 

export default Main