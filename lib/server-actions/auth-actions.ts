'use server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { SignUpFormSchema, loginSchema } from './../types';


import { z } from "zod";


async function actionLoginUser({email , password} : z.infer<typeof loginSchema>){
const supabase =  createRouteHandlerClient({cookies});
const res =  await supabase.auth.signInWithPassword({email , password})
console.log({res})
return res;
}

async function actionSignupUser({email , password , confirmPassword} : z.infer<typeof SignUpFormSchema>){
    const supabase =  createRouteHandlerClient({cookies});
    if(!(password === confirmPassword))  return { error: { message: 'Password not matched' } };
    const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email);

  if (data?.length) return { error: { message: 'User already exists', data } };

    const res =  await supabase.auth.signUp({email , password , options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
      }})
    console.log({res})
    return res;

    }

export {actionLoginUser , actionSignupUser};