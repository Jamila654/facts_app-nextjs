'use client'
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { MdContentCopy } from "react-icons/md";
import { FaCheck, FaCopy } from "react-icons/fa";


export default function Home() {

  const [isloading, setisloading] = useState<boolean>(false)
  const [isFactVisible, setisFactVisible] = useState<boolean>(false)
  const [error, seterror] = useState<string>()
  const [fact, setfact] = useState<[]>([])
  const [isCopied, setisCopied] = useState<boolean>(false)


  const handleGenerateBtn = async () => {
    setisloading(true)
    seterror("")
    try {
      const res = await fetch('https://api.api-ninjas.com/v1/facts', {headers:
        {"X-Api-Key": 'lKtqOcitXKlPdf5kvf1ysg==AguhIHwYblypgdyF'
        }
      })
      const data = await res.json()
      setfact(data[0].fact)
      setisFactVisible(true)
      
    } catch (error) {
      seterror("There is a problem in generating fact! Please try again later.")
    }finally{
      setisloading(false)
    }
  }

  const handleCrossBtn = function() {
    setisFactVisible(false)
    setisCopied(false)
  }

  const handleCopyBtn = function () {
    try {
      setisCopied(true)
      const text: string = `fact: "${fact}!"`
      navigator.clipboard.writeText(text)
      alert("Fact Copied Successfully!")
    } catch (error) {
      alert("Error copying fact")
      setisCopied(false)
    }
  }


  return (
    <div
      className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ background: "url(/background.jpg) right" }}
    >
      {isFactVisible?
      <div className="showFact">
        <Card>
        <div className="crossBtn relative">
          <Button onClick={handleCrossBtn} className=" bg-red-600 rounded-full py-4 px-2 absolute -right-2 -top-2 hover:bg-red-400"><ImCross className=" size-6" /></Button>
        <CardHeader className=" text-center">
          <CardTitle>Facts App</CardTitle>
          <CardDescription>Explore fun facts and copy your favorites instantly with my Facts App!</CardDescription>
        </CardHeader>
        </div>
        <CardFooter className=" flex items-centern justify-between gap-2">
          <div className="fact animate-fade-in-out ">"{fact}!"</div>
          <div className="copyBtn">
            {isCopied ?
            <div className="copied"><Button variant='ghost'><FaCheck className=" size-4"/></Button></div>
            : 
            <div className="copy transition transform duration-300 ease-in-out active:scale-90"><Button variant='ghost' onClick={handleCopyBtn}><FaCopy className=" size-4"/></Button></div>
            }
            </div>
        </CardFooter>
      </Card>
      </div>
       : 
       <div className="generate">
        <Card>
        <CardHeader className=" text-center">
          <CardTitle>Facts App</CardTitle>
          <CardDescription>Explore fun facts and copy your favorites instantly with my Facts App!</CardDescription>
        </CardHeader>
        <CardContent>
          {isloading ?
          <div className="loading w-full">
            <Button className=" w-full bg-yellow-400 text-black text-center font-bold text-xl hover:bg-yellow-200"><ClipLoader/></Button>
          </div>
          : 
          <div className="generate w-full">
            <Button onClick={handleGenerateBtn} className=" w-full bg-yellow-400 text-black font-bold text-xl hover:bg-yellow-200">Generate</Button>
          </div>
          }
        </CardContent>
        <CardFooter>
          {error && (
            <div className="err w-full font-bold text-red-600 text-center">{error}</div>
          )}
        </CardFooter>
      </Card>
       </div>
      }
      
    </div>
  );
}
