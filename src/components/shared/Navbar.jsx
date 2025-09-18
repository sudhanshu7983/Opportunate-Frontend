import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg border-b border-yellow-400 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-8'>
                <div>
                    <h1 className='text-3xl font-serif font-bold text-yellow-400 tracking-wide'>Job<span className='text-yellow-600'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-16'>
                    <ul className='flex font-serif font-semibold text-yellow-300 items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link className="hover:text-yellow-500 transition duration-300" to="/admin/companies">Companies</Link></li>
                                    <li><Link className="hover:text-yellow-500 transition duration-300" to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link className="hover:text-yellow-500 transition duration-300" to="/">Home</Link></li>
                                    <li><Link className="hover:text-yellow-500 transition duration-300" to="/jobs">Jobs</Link></li>
                                    <li><Link className="hover:text-yellow-500 transition duration-300" to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login"><Button variant="outline" className= "bg-black hover:bg-gray-100 hover:text-black transition duration-300">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-black hover:bg-gray-800 transition duration-300">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-yellow-400">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 bg-gray-900 text-yellow-300 border border-yellow-400">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className="cursor-pointer ring-2 ring-yellow-400">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-serif font-semibold'>{user?.fullname}</h4>
                                                <p className='text-sm text-yellow-400'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-yellow-300'>
                                            {
                                                user && user.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link" className="text-yellow-400 hover:text-yellow-500"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link" className="text-yellow-400 hover:text-yellow-500">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar
