import React, { useState } from "react";
import { BiWinkTongue } from "react-icons/bi";
import { FaGithubAlt } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  useModal,
  Input,
  Button,
  Text,
  Row,
  Checkbox,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";

import confetti from "canvas-confetti";
import bgVideo from "../assets/bg.mp4";
import logo from "../assets/logowhite.png";

import { getCurrentUser, login } from "../utils/APIUtils";
import { ACCESS_TOKEN } from "../utils/constants";

const Login = () => {
  const [flag, setFlag] = useState(false);
  const [nativeVisible, setNativeVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { setVisible, bindings } = useModal();

  const randomInRange = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const firework = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);
  };

  const handleNativeLogin = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });

    setNativeVisible(true);
  };

  const handleGithubLogin = () => {
    firework();
  };

  const closeHandler = () => {
    setNativeVisible(false);
  };

  const handleLoginModal = () => {
    console.log(usernameOrEmail + ": " + password + ": " + rememberMe);
    const loginRequest = { usernameOrEmail, password, rememberMe };
    let msg = "";
    login(loginRequest)
      .then((response) => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        msg = "登陆成功";
        loadCurrentUser();
        setNativeVisible(false);
      })
      .catch((error) => {
        msg = error.message;
      })
      .finally(() => {
        toast("🦄 " + msg, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          progress: undefined,
        });
      });
  };

  const loadCurrentUser = () => {
    getCurrentUser()
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className=" relative w-full h-full">
        <video
          src={bgVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="Tesla" />
          </div>
          {/* README */}
          <Button auto shadow disabled={flag} onClick={() => setVisible(true)}>
            README
          </Button>
          <Modal
            scroll
            width="600px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                关于此站点相关的信息
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Text id="modal-description">拒绝约炮 By Tesla</Text>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={() => setVisible(false)}>
                Close
              </Button>
              <Button
                style={{ color: "#14b8a6" }}
                auto
                onClick={() => {
                  setVisible(false);
                  setFlag(true);
                }}
              >
                Agree
              </Button>
            </Modal.Footer>
          </Modal>

          {/* 登陆按钮 */}
          <Button
            disabled={!flag}
            size="lg"
            rounded
            onClick={handleNativeLogin}
            shadow
            className="mt-4"
          >
            <BiWinkTongue className="mr-4" /> Sign in
          </Button>

          <Modal
            closeButton
            scroll
            aria-labelledby="modal-title"
            open={nativeVisible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Welcome to{" "}
                <Text b size={18}>
                  Sharing By Tesla
                </Text>
              </Text>
            </Modal.Header>
            <Modal.Body>
              <Input
                clearable
                bordered
                fullWidth
                aria-label="UsernameOrEmail"
                size="lg"
                placeholder="UsernameOrEmail"
                contentLeft={<AiOutlineMail />}
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
              <Input
                clearable
                bordered
                fullWidth
                aria-label="Password"
                size="lg"
                placeholder="Password"
                contentLeft={<RiLockPasswordLine />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Row justify="space-between">
                <Checkbox onChange={() => setRememberMe(!rememberMe)}>
                  <Text size={14}>Remember me</Text>
                </Checkbox>
                <Text size={14}>Forgot password?</Text>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button
                auto
                style={{ color: "#14b8a6" }}
                onClick={handleLoginModal}
              >
                Sign in
              </Button>
            </Modal.Footer>
          </Modal>

          <Button
            size="lg"
            rounded
            disabled={!flag}
            onClick={handleGithubLogin}
            shadow
            className="mt-6"
          >
            <FaGithubAlt className="mr-4" /> Sign in with Github
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
