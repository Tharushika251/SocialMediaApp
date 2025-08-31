import { ArrowLeft, Sparkle, TextIcon, Upload } from 'lucide-react'
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const StoryModal = ({setShowModal, fetchStories}) => {

    const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"]

    const [mode, setMode] = useState("text")
    const [background, setBackground] = useState(bgColors[0])
    const [text, setText] = useState("")
    const [media, setMedia] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null)


    const handleMediaUpload = (e) => {
        const file = e.target.files?.[0]  
        if (file) {
            setMedia(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleCreateStory = async () => {
        //Validate inputs
        if (mode === 'text' && !text.trim()) {
            throw new Error("Text content cannot be empty");
        }
        if (mode === 'media' && !media) {
            throw new Error("Please upload a media file");
        }

        //Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        //close modal and refresh stories
        setShowModal(false);
        fetchStories();

        //Return success message
        return "Story created successfully!";
    }
    
  return (
    <div className='fixed inset-0 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center z-110'>
        <div className='w-full max-w-md'>
            <div className='text-center mb-4 flex-items-center justify-between'>
                <button onClick={() => setShowModal(false)} className='text-white p-2 cursor-pointer'>
                    <ArrowLeft className='w-5 h-5' />
                </button>
                <h2 className='text-lg font-semibold'>Create Story</h2>
                <span className='w-10'></span>
            </div>
            <div className='rounded-lg h-96 flex items-center justify-center relative' style={{backgroundColor: background}}>
            {
                mode === 'text' && (
                    <textarea className='bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none' placeholder="What's on your mind?" value={text} onChange={(e) => setText(e.target.value)} />
                )
            }
            {
                mode === 'media' && previewUrl &&(
                    media?.type.startsWith('image') ? (
                        <img src={previewUrl} alt="" className='max-h-full object-contain' />
                    ) : (
                        <video src={previewUrl} className='max-h-full object-contain' />
                    )
                )
            }
            </div>
            <div className='flex gap-2 mt-4'>
                { bgColors.map((color) => (
                    <button key={color} onClick={() => setBackground(color)} className='w-8 h-8 rounded-full ring cursor-pointer' style={{backgroundColor: color}}/>
                ))}
            </div>
            <div className='flex gap-2 mt-4'>
                <button onClick={() => {setMode("text"); setMedia(null); setPreviewUrl(null)}} className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'text' ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <TextIcon size={18}/> Text
                </button>
                <label className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${mode === 'media' ? "bg-white text-black" : "bg-zinc-800"}`}>
                    <input type="file" accept="image/*,video/*" className='hidden' 
                    onChange={(e)=>{handleMediaUpload(e); setMode('media')}} />    
                    <Upload size={18} /> Photo/Video          
                </label>
            </div>
            <Toaster />
            <button onClick={()=> toast.promise(
                handleCreateStory(),
                {
                    loading: 'Saving...',
                    success: <p>Story Added</p>,                
                    error: e => <p>{e.message}</p>
                }
            )} className='flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded
                bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 
                active:scale-95 transition cursor-pointer'>
                <Sparkle size={18}/> Create Story 
            </button>
        </div>
    </div>
  )
}

export default StoryModal