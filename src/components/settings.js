import React, { useEffect } from 'react';
import styled from 'styled-components';
import { initializeDarkMode, toggleDarkMode } from './darkmode';

function Settings() {
	useEffect(() => {
		initializeDarkMode();
	  }, []);
  return (
    <Wrapper className="section">
      <div className="wrapper">
        <h1>Dark Mode</h1>
        <label className="switch">
          <input
            id="js-switch"
            type="checkbox"
            onChange={toggleDarkMode}
            checked={document.body.classList.contains('dark')}
          />
          <div className="slider"></div>
        </label>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`

@import url("https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:400");

$grey-light: rgb(237, 237, 242);
$accent: #fdd835;
$white: rgb(255, 255, 255);

@mixin transition($time) {
	transition: all $time cubic-bezier(0.65, 0, 0.15, 1);
}

html {
	font-family: "Barlow Semi Condensed";
	font-size: calc(12px + 1vw);
	height: 100vh;
}
body {
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #212121;
	@include transition(250ms);
		&.dark {
		background: #121212;
		color: #dadada;
			.wrapper {
				border-color: #333;
			}
	}
}
h1 {
	font-weight: 400;
}

.wrapper {
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
	width: 100%;
	border-top: 1px solid $grey-light;
	border-bottom: 1px solid $grey-light;
	@include transition(250ms);
}

.switch {
	position: relative;
	width: 4rem;
	height: 2rem;
	&:hover {
		.slider {
			background-color: rgba(0, 0, 0, 0.05);
			&:before {
				box-shadow: inset 0.2em -0.2em 0.75em rgba(0, 0, 0, 0.15);
			}
		}
	}
}

.switch input {
	display: none;
}

/* The slider */
.slider {
	will-change: auto;
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-blend-mode: multiply;
	background-image: linear-gradient(to right, $grey-light 50%, $accent 50%);
	background-size: 200%;
	background-position: 0;
	border-radius: 1rem;
	box-shadow: inset -0.15em 0.15em 0.25em rgba(0, 0, 0, 0.1);
	@include transition(250ms);
}

.slider:before {
	will-change: auto;
	position: absolute;
	content: "";
	height: 2em;
	width: 2em;
	transform: scale(1.1);
	border-radius: 50%;
	background-image: radial-gradient(
		$white 40%,
		$grey-light 60%,
		$white 65%,
		$grey-light 100%
	);
	box-shadow: inset 0.2em -0.2em 0.75em rgba(0, 0, 0, 0.15);
	@include transition(250ms);
}

input:checked + .slider {
	background-position: 4em;
	box-shadow: inset -0.1em 0.1em 0.35em -0.05em rgba(0, 0, 0, 0.15);
}

input:checked + .slider:before {
	transform: scale(1.1) translateX(2em);
	box-shadow: inset 0.1em -0.15em 0.5em rgba(0, 0, 0, 0.15),
		-0.1em 0 0.25em -0.1em rgba(0, 0, 0, 0.2);
}

`;
export default Settings
