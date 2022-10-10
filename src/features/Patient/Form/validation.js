import * as z from "zod";
import { string } from "zod";


export const PatientSchema = z.object({
    name: z
        .string({
            invalid_type_error: "Nameis required",
        })
        .min(8, "Password should not be less than 8 characters")
        
        .nonempty({ message: "Name is required" }),
  email: z
    .string({ invalid_type_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email(),
    
    contact: z
        .string({
            invalid_type_error: "Contact is required",
        })
        .min(10, "Contact should not be less than 10 characters")
        .nonempty({ message: "constact is required" }),
    
    dob: z
        .string({
            invalid_type_error: "Date of birth is required",
        })
        .nonempty({ message: "Date of birth is required" }),
})



