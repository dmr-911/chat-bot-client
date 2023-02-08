import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { AiTwotoneAudio } from "react-icons/ai";
import Bot from "../images/bot.png";
import useLocalStorage from "../hooks/useLocalStorage";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import website from "../images/cuate.png";
import userImage from "../images/user.png";
import { FaRegStopCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const SpeechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

const ChatUi = () => {
  const { user, name, setUser, chatHistory, deleteChat } = useAuth();

  // message states
  const [userMsgArrNew, setUserMsgArrNew] = useState([]);
  const [botMsgArrNew, setBotMsgArrNew] = useState([]);

  // mic states
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");

  // value of local storage
  const [userMsgArr, setUserMsgArr] = useLocalStorage("userMsgArr", []);
  const [botMsgArr, setBotMsgArr] = useLocalStorage("botMsgArr", []);
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

  // axios config
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  // message container ref
  const messageRef = useRef();

  // Formik
  const initialValues = {
    text: "",
  };

  // text to server handler
  const textToServer = async (user_input) => {
    await axios
      .post(`chatbot/`, { user_input, language: "English" }, config, {
        withCredentials: true,
      })
      .then((res) => {
        // getting response
        axios
          .get(`chatbot/?task_id=${res.data.task_id}`, config)
          .then((res) => {
            setBotMsgArr([...botMsgArr, res?.data?.data]);

            // set value to state
            setBotMsgArrNew((prev) => [...prev, res?.data?.data]);
          })
          .catch((err) => {
            console.log(err);
            setBotMsgArr([...botMsgArr, "Please try again"]);
          });
      })
      .catch((err) => {
        console.log(err);
        setBotMsgArr([...botMsgArr, "Please try again"]);
      });
  };

  // submit form handler
  const onSubmit = async (values) => {
    const newPrompt = values.text;
    setUserMsgArr([...userMsgArr, newPrompt]); // set user msg to local storage
    setUserMsgArrNew((prev) => [...prev, newPrompt]);
    formik.values.text = "";

    // checking if image
    if (newPrompt.startsWith("/image")) {
      const prompt = newPrompt.split("/image")[1];
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/image_chat`, { prompt })
        .then((res) => {
          axios
            .get(`${process.env.REACT_APP_BASE_URL}/image/${res.data.task_id}`)
            .then((res) => {
              setBotMsgArr([
                ...botMsgArr,
                JSON.stringify(res.data.data[0].url),
              ]);
              setBotMsgArrNew((prev) => [...prev, res.data.data[0].url]);
              setNote(null);
            })
            .catch((err) => {
              setBotMsgArr([...botMsgArr, "Please try again"]);
            });
        })
        .catch((err) => {
          console.log(err.response);
          setBotMsgArr([...botMsgArr, "Please try again"]);
        });
    } else {
      // if not image
      textToServer(newPrompt);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  // delete conversation method
  const handleDeleteConversation = () => {
    setBotMsgArrNew([]);
    setUserMsgArrNew([]);
    deleteChat();
  };

  // scroll to bottom handler
  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // effect for message scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [userMsgArrNew, botMsgArrNew]);

  // mic events
  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped mic on click");
      };
    }

    mic.onstart = () => {
      console.log("mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setNote(transcript);

      // manupulating final result
      if (event?.results[0]?.isFinal) {
        if (transcript.includes("YouTube")) {
          window.open("https://youtube.com");
        }
      }

      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  // calling method when mic on or off
  useEffect(() => {
    handleListen();
  }, [isListening]);

  // update input on mic
  useEffect(() => {
    formik.setFieldValue("text", note);
  }, [note]);

  // retrive user chat history
  useEffect(() => {
    if (user?.username) {
      const chatHistory = async () => {
        const config = {
          headers: { Authorization: `Bearer ${accessToken}` },
        };

        const response = await axios.get("chatbot/history/", config);

        // set arrays to states
        setUserMsgArrNew(response.data.userMsgArr.reverse());
        setBotMsgArrNew(response.data.botMsgArr.reverse());
      };
      chatHistory();
    }
  }, [user?.username]);

  return (
    <section className="bg-body md:py-16 h-full relative p-4">
      {/* main chat section */}
      <div className="xl:w-[860px] bg-white mx-auto rounded-xl relative">
        {/* component */}
        <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[55vh] overflow-hidden">
          {/* <div className="flex-1 sm:p-6 justify-between flex flex-col h-screen xl:h-[860px] overflow-hidden"> */}
          <div
            id="messages"
            className="absolute w-full left-0 bottom-20 h-[75vh] flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-hide"
          >
            <div className="chat-message">
              <div className="flex items-center">
                <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start">
                  <span className="text-2xl font-bold">This is {name}</span>
                </div>
                <img
                  src={Bot}
                  alt="My profile"
                  className="w-14 h-14 rounded-full order-1"
                />
              </div>
            </div>
            <div className="chat-message xl:ml-14">
              <div className="flex items-center">
                <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start">
                  <div className="">
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                      How can I help you today ?
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* displaying user record message */}
            {isListening && note ? (
              <div className="chat-message mb-4">
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        {note}
                      </span>
                    </div>
                  </div>
                  <img
                    src={userImage}
                    alt="My profile"
                    className="w-14 h-14 rounded-full order-2"
                  />
                </div>
              </div>
            ) : null}

            {/* displaying user message */}
            {botMsgArrNew.length && userMsgArrNew.length
              ? userMsgArrNew.map((msg, i) => (
                  <div key={msg}>
                    <div className="chat-message mb-4">
                      <div className="flex items-end justify-end">
                        <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-1 items-end">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                              {msg}
                            </span>
                          </div>
                        </div>
                        <img
                          src={userImage}
                          alt="My profile"
                          className="w-14 h-14 rounded-full order-2"
                        />
                      </div>
                    </div>

                    <div className="chat-message">
                      <div className="flex items-end">
                        <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start">
                          <div>
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                              {botMsgArrNew.length ? (
                                <>
                                  {botMsgArrNew[i] ? (
                                    botMsgArrNew[i].startsWith("https://") ? (
                                      <img
                                        src={botMsgArrNew[i]}
                                        alt="image"
                                      />
                                    ) : (
                                      botMsgArrNew[i]
                                    )
                                  ) : null}
                                </>
                              ) : null}
                            </span>
                          </div>
                        </div>
                        <img
                          src={Bot}
                          alt="My profile"
                          className="w-14 h-14 rounded-full order-1"
                        />
                      </div>
                    </div>
                  </div>
                ))
              : null}
            <div ref={messageRef} />
          </div>
          <div className="w-full absolute left-0 bottom-8 border-t-2 bg-white border-gray-200 px-4 pt-4 mb-2 sm:mb-0 flex xl:gap-4">
            <div className="relative flex flex-grow">
              <form
                onSubmit={formik.handleSubmit}
                className="w-full relative flex"
              >
                <input
                  id="text"
                  name="text"
                  type="text"
                  placeholder="Share your thoughts..."
                  className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-[#817F8E] pl-4 bg-gray-200 rounded-md py-3"
                  //   onChange={(e) => setPrompt(e.target.value)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.text}
                />
                <div className="absolute right-0 items-center inset-y-0 flex">
                  <button
                    type="submit"
                    //   onClick={handleSubmit}
                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-6 w-6 ml-2 transform rotate-90 text-[#3E8A5F]"
                    >
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Mic button and  stop button */}
            {isListening ? (
              <FaRegStopCircle
                onClick={() => setIsListening((prev) => !prev)}
                className={`text-3xl mt-2 text-red-500 cursor-pointer`}
              />
            ) : (
              <AiTwotoneAudio
                onClick={() => setIsListening((prev) => !prev)}
                className={`text-3xl mt-2 hover:text-[#3E8A5F] ${
                  isListening ? "text-[#3E8A5F]" : "text-black"
                } cursor-pointer`}
              />
            )}

            {/* Delete button */}
            {userMsgArrNew.length && botMsgArrNew.length ? (
              <RiDeleteBin6Line
                className="text-3xl mt-2 text-red-400 cursor-pointer hover:text-red-600 transition-all duration-150"
                // onClick={deleteChat}
                onClick={handleDeleteConversation}
                title="Delete Chat history"
              />
            ) : null}
          </div>
        </div>
        {/* aside section */}
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n.scrollbar-w-2::-webkit-scrollbar {\n  width: 0.25rem;\n  height: 0.25rem;\n}\n\n.scrollbar-track-blue-lighter::-webkit-scrollbar-track {\n  --bg-opacity: 1;\n  background-color: #f7fafc;\n  background-color: rgba(247, 250, 252, var(--bg-opacity));\n}\n\n.scrollbar-thumb-blue::-webkit-scrollbar-thumb {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237, 242, 247, var(--bg-opacity));\n}\n\n.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {\n  border-radius: 0.25rem;\n}\n",
          }}
        />
        <aside className="hidden xl:block overflow-hidden mx-auto xl:mx-0 xl:relative xl:h-[300px] xl:-right-[20rem] xl:ml-auto w-[264px] bg-white rounded-xl px-2 py-3">
          <div className="pt-4 mb-16">
            <p className="text-2xl">Visit my website</p>
            <img
              className="mx-auto h-[100pxx] w-[95px] mt-4"
              src={website}
              alt="website"
            />
          </div>
          <a
            href="/"
            className="bg-[#3E8A5F] text-white rounded-md py-3 relative block w-full"
          >
            Go to my vegan coach
          </a>
        </aside>
      </div>

      {/* Mobile side bar */}
      <aside className="xl:hidden mx-auto w-[264px] bg-white rounded-xl px-2 py-3 mt-4">
        <div className="pt-4 mb-16">
          <p className="text-2xl">Visit my website</p>
          <img
            className="mx-auto h-[100pxx] w-[95px] mt-4"
            src={website}
            alt="website"
          />
        </div>
        <a
          href="/"
          className="bg-[#3E8A5F] text-white rounded-md py-3 relative block w-full"
        >
          Go to my vegan coach
        </a>
      </aside>
    </section>
  );
};

export default ChatUi;
