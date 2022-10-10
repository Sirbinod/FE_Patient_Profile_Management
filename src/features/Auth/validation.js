import * as z from "zod";
import { string } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email is required" })
    .nonempty({ message: "Email is required" })
    .email(),
    
    password: z
        .string({
            invalid_type_error: "Password is required",
        })
        .min(8, "Password should not be less than 8 characters")
        .nonempty({ message: "Password is required" }),
})



export const SignUpSchema = z.object({
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
    
    password: z
        .string({
            invalid_type_error: "Password is required",
        })
        .min(8, "Password should not be less than 8 characters")
        .nonempty({ message: "Password is required" }),
})



