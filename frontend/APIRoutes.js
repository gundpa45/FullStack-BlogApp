const host = 'http://localhost:3000'

export const LoginRoutes = `${host}/api/v1/login`
export const SignUpRoutes = `${host}/api/v1/signup`
export const VerifyOtpRoute = `${host}/api/v1/verifyOtp`
export const ProfileRoute = `${host}/api/v1/profile`
export const UpdateRoute = `${host}/updateBlog/:blogId`
export const DeleteRoute = `${host}/api/v1/deleteBlog`
export const AllBlogsRoute = `${host}/api/v1/getallblogs`
export const LikeRoutes = `${host}/api/v1/like`
export const CreateBlogRoute = `${host}/api/v1/create`
export const UpdateBlogRoute = `${host}/api/v1/updateBlog`
export const getContentType = (category) => `${host}/api/v1/blogs?category=${category}`;
export const getBlogDetails =(id) =>  `${host}/api/v1/blogs/${id}`
export const forgotPassword = `${host}/api/v1/forgotpassword`
export const updatepasswordRoute = (userId) => `${host}/api/v1/updatepassword/${userId}`
export const verifyOtpPasswordRoute = `${host}/api/v1/verifyotpPassword`
export const getComments = (blogId) => `${host}/api/v1/getcomments/${blogId}`;
export const createComments = (blogId) => `${host}/api/v1/comments/${blogId}`;