const ErrorHandler = (error,props) => {
    console.log("error",error.response)
    // alert(error.response.data.user.data)
    try {
        if(error.response.status===409)
        {
        return "Record already exist!"
        }
        else if(error.response.status===404){
         return "User Not Found"
        }
        else if(error.response.status===400){          
            return "Bad Request"
           
        }
        // else if(error.response.status===422){
        //     alert("Please fill up all details")
        // }
        // else if(error.response.status===415){
        //     alert("only .jpg, .png and .jpeg files allowed")
        // }
        else if(error.response.status===500){
            alert("Something went wrong,Please try again.")
        }
        // else if(error.response.status===200){
        //     alert("response get successfully")
        // }
    } catch (error) {
        
    }
}
export default ErrorHandler