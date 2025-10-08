const url = "https://qkbvaymcimrgdjsgvaxz.supabase.co"


const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrYnZheW1jaW1yZ2Rqc2d2YXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNjA4OTUsImV4cCI6MjA2ODgzNjg5NX0.1O0W529npjym0mnsfpVA50aMzFxUzyai3LujhoGlVTo"

//https://kqqksprnwflfroartvlu.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxcWtzcHJud2ZsZnJvYXJ0dmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNzQ2NjMsImV4cCI6MjA2ODY1MDY2M30.LHNG-UIw-7dpjtpG2FsaujiNEGP_U7takFiLaKqqjUc"

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(url,key)

export default function uploadFile(file){
    const promise  = new Promise(

        (resolve, reject)=>{

            if(file == null){
                reject("Please select a file to upload");
                return;
            }

            const timeStamp = new Date().getTime();
            const fileName = timeStamp+"-"+file.name

            supabase.storage.from("images").upload(fileName,file,{
                cacheControl: "3600",
                upsert: false
            }).then(
                ()=>{
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                    resolve(publicUrl)
                }
            ).catch(
                ()=>{
                    reject("Failed to upload file");
                }
            )
            

        }

    )
    return promise;
}

