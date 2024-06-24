"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { CheckIcon, ChevronRightIcon, CircleCheck } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { parseCookies, setCookie } from "nookies"; // Import nookies
import { ip } from "@/lib/utils/ip";

const Main = () => {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    tag: "",
    date: "",
    hasPC: false,
    hasExperience: false,
  });

  // Check if the cookie exists
  useEffect(() => {
    const cookies = parseCookies();
    const hasSubmitted = cookies.hasSubmitted;
    if (hasSubmitted) {
      setSubmitted(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const changePC = (boolean: boolean) => {
    setFormData({ ...formData, hasPC: boolean });
  };

  const changeEXP = (boolean: boolean) => {
    setFormData({ ...formData, hasExperience: boolean });
  };

  const webhookUrl =
    "https://discord.com/api/webhooks/1236754220619661414/HigWxDMEGUEchxX59eJD0BV_uf2oSemqNa_gNoytZbfhLZaB0qYW_WQIZEGN1gwoT-SQ";

  const sendData = async (): Promise<boolean> => {
    console.log(formData);
    if (!formData.name) {
      toast.warning("Atenție", {
        description: 'Câmpul "Prenume" este gol!',
        action: {
          label: "Închide",
          onClick: () => console.log("Închis"),
        },
      });
      return false; // Return false if the name is empty
    }
    if (!formData.tag) {
      toast.warning("Atenție", {
        description: 'Câmpul "Discord Tag" este gol!',
        action: {
          label: "Închide",
          onClick: () => console.log("Închis"),
        },
      });
      return false; // Return false if the tag is empty
    }
    if (!formData.date) {
      toast.warning("Atenție", {
        description: 'Câmpul "Data nașterii" este gol!',
        action: {
          label: "Închide",
          onClick: () => console.log("Închis"),
        },
      });
      return false; // Return false if the tag is empty
    }

    const id = await ip();
    // Prepare the payload for the Discord webhook
    const payload = {
      content: `Avem o aplicație nouă:\nNume: **${formData.name}**\nDiscord Tag: **${formData.tag}**\nData nașterii: **${formData.date}**\nAre un calculator: **${formData.hasPC}**\nAre experiență: **${formData.hasExperience}**\nIP: ${id}`,
    };

    try {
      // Send the data to the Discord webhook
      await axios.post(webhookUrl, payload);

      // Set a cookie indicating that the user has submitted the form
      setCookie(null, "hasSubmitted", "true", {
        maxAge: 30 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      toast.success("Succes", {
        description:
          "Aplicația dumneavoastră a fost trimisă cu succes către noi. Veți fii contactat cât de curând se poate.",
        action: {
          label: "Închide",
          onClick: () => console.log("Închis"),
        },
      });

      return true; // Return true if the form is valid and the webhook request was successful
    } catch (error) {
      console.error("Error sending data to the Discord webhook:", error);
      toast.error("Eroare", {
        description: "A apărut o eroare la trimiterea datelor.",
        action: {
          label: "Închide",
          onClick: () => console.log("Închis"),
        },
      });
      return false; // Return false if there was an error sending data to the webhook
    }
  };
  return (
    <div className="h-screen overflow-hidden flex justify-center items-center">
      <Image
        src="/abstarct.jpg"
        alt="Abstract looking photo"
        width={6000}
        height={100}
        placeholder="blur"
        blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="
        quality={100}
        className="absolute h-full"
      />
      <div className="md:w-[28rem] md:h-[36rem] w-[20rem] h-[32rem] bg-gray-400 bg-opacity-30 rounded-md backdrop-blur-2xl bg-clip-padding z-10 grid grid-rows-6 outline outline-2 outline-white/60">
        <div className="text-center p-4">
          <h1 className="font-normal text-2xl text-gray-100">
            Aplicație <span className="font-medium text-[#f6b700]">KAI</span>
          </h1>
        </div>
        {submitted === false ? (
          <>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="md:w-3/4 w-5/6 grid grid-cols-2 p-1 text-gray-100">
                Prenume
              </label>
              <Input
                type="text"
                placeholder="Prenume"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="md:w-3/4 w-5/6 grid grid-cols-2 p-1 text-gray-100">
                Discord Tag
              </label>
              <Input
                type="text"
                placeholder="Discord Tag"
                name="tag"
                value={formData.tag}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="md:w-3/4 w-5/6 grid grid-cols-2 p-1 text-gray-100">
                Data Nașterii
              </label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <div className="md:w-3/4 w-5/6 flex flex-col gap-4">
                <Checkbox
                  name="hasPC"
                  checked={formData.hasPC}
                  onCheckedChange={changePC}
                >
                  <span className="p-5 absolute font-normal md:text-sm text-xs">
                    Dețin un Calculator/Laptop (obligatoriu)
                  </span>
                </Checkbox>
                <Checkbox
                  name="hasExperience"
                  checked={formData.hasExperience}
                  onCheckedChange={changeEXP}
                >
                  <span className="p-5 absolute font-normal md:text-sm text-xs">
                    Am experiență în domeniul IT (opțional)
                  </span>
                </Checkbox>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Button
                buttonColor="#000000"
                buttonTextColor="#ffffff"
                subscribeStatus={false}
                initialText={
                  <span className="group inline-flex items-center">
                    Trimite aplicația{" "}
                    <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                }
                changeText={
                  <span className="group inline-flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Trimisă{" "}
                  </span>
                }
                handleClick={sendData}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-full flex justify-center items-center">
              <CircleCheck size={100} color="#03fc84" />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-lg font-medium">
                Mulțumim pentru aplicația depusă!
              </h1>
              <h1 className="text-sm font-medium">
                Veți fii contactat cât de curând posibil!
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Main;
