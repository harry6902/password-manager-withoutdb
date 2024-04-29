import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let password = localStorage.getItem("passwords");
        if (password) {
            setPasswordArray(JSON.parse(password))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to CLipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        navigator.clipboard.writeText(text);
    }



    const showpassword = () => {


        if (ref.current.src.includes("icons/eye.png")) {
            ref.current.src = "icons/hidden.png";
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        }
    }
    const savepassword = () => {

        //console.log(form)
        
          if(form.site.length>3 && form.username.length>3 && form.password.length>3){

              setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
              localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
              console.log([...passwordArray, form])
              setform({ site: "", username: "", password: "" });
            }
            else{
                toast('Password not saved', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }  
        
        
            
        }
        const deletePassword = (id) => {
        
        let c= confirm("Do you really want to delete this password?");
        if(c){
       

            let newPasswords=passwordArray.filter((item)=>{
                return item.id!==id;
            })
            setPasswordArray(newPasswords)
            
            localStorage.setItem("passwords", JSON.stringify(newPasswords));
        }


        // setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
        // console.log([...passwordArray, form])
    }
    const editPassword = (id) => {
        let newForm=passwordArray.filter((item)=>{
           return id===item.id
        });
        console.log(newForm);
        
        let newPasswords=passwordArray.filter((item)=>{
            return item.id!==id;
          })
          setPasswordArray(newPasswords);
          setform(newForm[0]);
          localStorage.setItem("passwords", JSON.stringify(newPasswords));


        // setPasswordArray([...passwordArray, {...form,id:uuidv4()}]);
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
        // console.log([...passwordArray, form])
    }
    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
/>
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform
             bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className=" md:w-5/6  bg-slate-50 px-2 md:px-0 md:mycontainer min-h-[82vh]">


                <h1 className='text-center font-bold text-4xl'>
                    <span className=' text-green-500'>&lt;</span>
                    Pass
                    <span className=' text-green-500'>OP/ &gt;</span>
                </h1>
                <p className='text-green-900 text-center text-lg'>Your own password manager</p>
                <div className="flex flex-col p-4 gap-8 items-center">
                    <input placeholder='Enter Website URL' value={form.site} onChange={handlechange} className='rounded-full border border-green-400 w-full p-4 py-1' type="text" name='site' id='' />
                    <div className="flex flex-col md:flex-row w-full gap-8">
                        <input value={form.username} onChange={handlechange} placeholder='Enter Username' className='rounded-full border border-green-400 w-full p-4 py-1 ' type="text" name='username' id='' />
                        <div className="relative">

                            <input ref={passwordRef} value={form.password} onChange={handlechange} placeholder='Enter Password' className='rounded-full border border-green-400 w-full p-4 py-1 ' type="password" name='password' id='' />
                            <span className='absolute right-[4px] top-[5px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} src="icons/eye.png" width={24} alt="" /></span>
                        </div>
                    </div>


                    <button onClick={savepassword} className='flex justify-center items-center text-center bg-green-600 rounded-full w-fit
                         hover:bg-green-400 px-6 py-2 gap-2 border border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add Password</button>

                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords...</h2>
                    {passwordArray.length === 0 && <div className='mb-10'> No passwords to display</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className=' text-center py-2 border border-white text-sm'>
                                        <div className='flex items-center justify-center'>
                                            <a href='{item.site}'>{item.site}</a>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.site) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white text-sm'>
                                        <div className='flex items-center justify-center'>
                                            <a href='{item.site}'>{item.username}</a>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.username) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white text-sm'>
                                        <div className='flex items-center justify-center'>
                                            <a href='{item.site}'><span>{item.password}</span></a>
                                            <div className='cursor-pointer size-7 lordiconcopy' onClick={() => { copyText(item.password) }}>

                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover"
                                                >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white text-sm '>
                                        <div className="flex justify-center items-center gap-4">
                                           <div className='cursor-pointer' onClick={()=>{editPassword(item.id)}}>
                                        <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    >
                                                </lord-icon>
                                                    </div>
                                                    <div className='cursor-pointer' onClick={()=>{deletePassword(item.id)}}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover"
                                                    >
                                                </lord-icon>
                                                    </div> 
                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager
