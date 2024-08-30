<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import Icon from '@iconify/svelte';
	import Video from '$lib/videos/hero.mp4';

	import { onMount } from 'svelte';

	import { db } from '../database/database.js';
	import { doc, setDoc, getDoc } from 'firebase/firestore';
	let email = '';
	let name = '';
	let message = '';
	let isSubmitting = false;
	let submitted = false;
	let visitorId = 0;
	let scroll = 0;
	let video;

	function handleScroll() {
		scroll = window.scrollY;
		const playScrollThreshold = 1000;

		if (scroll >= playScrollThreshold) {
			video.play();
		} else {
			video.pause();
		}
	}

	onMount(() => {
		const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4').then((FingerprintJS) =>
			FingerprintJS.load()
		);
		fpPromise
			.then((fp) => fp.get())
			.then((result) => {
				visitorId = result.visitorId;
			});

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	const handleSubmit = async () => {
		isSubmitting = true;
		const docRef = doc(db, 'users', visitorId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			alert("You've already joined the waiting list");
		} else {
			await setDoc(doc(db, 'users', visitorId), {
				name: name,
				email: email
			});
			submitted = true;
		}
		isSubmitting = false;
	};
</script>

<svelte:head>
	<title>LegalLense</title>
	<meta name="description" content="Legal Lense" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Hubballi&display=swap" rel="stylesheet" />
	<link
		href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100..900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<body data-sveltekit-preload-data="hover">
	{#if submitted}
		<div class="thankyou">Thank you for joining the waiting list</div>
	{:else}
		<Header />
		<section class="light">
			<h1>Protect Yourself from Legal Pitfalls</h1>
			<p>
				<span> Instantly analyze and simplify legal documents. </span>
				<span>
					LegalLens flags risky clauses, explains legal jargon, and helps you understand agreements
					effortlessly.
				</span>
			</p>
			<a href="#waitinglist"><button>Join the Waiting List</button></a>
		</section>
		<section class="dark left">
			<h1>A complete set of tools for legal analysis</h1>
			<div class="feature">
				<h2><span><Icon icon="icon-park-outline:search" /></span><span>Document Analysis</span></h2>
				<ul>
					<li>Identify Manipulative Clauses</li>
					<li>5 Point summary of the document</li>
					<li>Explain complex terms in simple words</li>
				</ul>
			</div>
			<div class="feature">
				<h2><span><Icon icon="typcn:warning-outline" /></span><span>Risk Assessment</span></h2>
				<ul>
					<li>Risk Rating</li>
					<li>Red Flag Alerts</li>
				</ul>
			</div>
			<div class="feature">
				<h2>
					<span><Icon icon="fluent:fingerprint-20-regular" /></span><span
						>Privacy and Data Security Checks</span
					>
				</h2>
				<ul>
					<li>Privacy Clauses Analysis</li>
				</ul>
			</div>
			<div class="feature">
				<h2><span><Icon icon="ant-design:user-outlined" /></span><span>User Interface</span></h2>
				<ul>
					<li>Available on desktop, mobiles, and browser extensions</li>
				</ul>
			</div>
		</section>
		<section class="light">
			<h1>How it works</h1>
			<div class="video">
				<video bind:this={video} src={Video} type="video/mp4" muted></video>
			</div>
		</section>
		<section class="dark" id="waitinglist">
			<h1>Join the waiting list</h1>
			<p>Be the first to try out LegalLens completely for free</p>
			<form>
				<input type="text" bind:value={name} placeholder="Your Name" />
				<input type="email" bind:value={email} placeholder="Your Email" />
				<button on:click={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Submitting...' : 'Join Now'}
				</button>
			</form>
		</section>
		<Footer />
	{/if}
</body>

<style>
	:root {
		--background-light: #3d4250;
		--background-dark: #2c2f38;
		--accent-color: #4f378b;
		--button-border: #7785a6;
		scroll-behavior: smooth !important;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.thankyou {
		font-size: 40px;
		color: green;
		text-align: center;
	}

	body {
		background-color: var(--background-light);
		color: white;
		font-family: 'Catamaran', sans-serif;
		font-optical-sizing: auto;
		font-style: normal;
		font-weight: normal;
		padding: 25px 0;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 35px;
		padding: 35px 500px;
		display: flex;
		flex-direction: column;
		gap: 35px;
	}
	.light {
		background-color: var(--background-light);
	}
	.dark {
		background-color: var(--background-dark);
	}
	.left {
		align-items: flex-start;
	}
	h1 {
		font-size: 40px;
		font-weight: 200;
	}
	button {
		background-color: var(--accent-color);
		outline: none;
		height: 40px;
		width: 200px;
		border-radius: 30px;
		border: 1px solid var(--button-border);
		color: white;
	}

	.feature > h2 {
		font-weight: 100;
		font-size: 24px;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.feature > h2 > span {
		display: flex;
		align-items: center;
	}

	.feature > ul {
		font-weight: 100;
		font-size: 18px;
		padding: 0 30px;
	}

	.video {
		border-radius: 30px;
		overflow: hidden;
		width: 400px;
		aspect-ratio: 9/16;
		height: max-content;
	}

	video {
		width: 100%;
	}

	p {
		font-size: 20px;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		margin-top: 10px;
		margin: auto;
		width: 400px;
	}

	input {
		padding: 8px;
		font-size: 16px;
		border-radius: 5px;
		border: 1px solid #ddd;
		width: 100%;
		outline: none;
	}

	button {
		padding: 10px;
		font-size: 16px;
		border: none;
		cursor: pointer;
		background-color: var(--accent-color);
		color: white;
		border-radius: 5px;
	}

	.message {
		margin-top: 10px;
		font-size: 14px;
	}

	@media only screen and (max-width: 1300px) {
		section {
			padding: 35px 400px;
		}
		form {
			width: 300px;
		}
	}
	@media only screen and (max-width: 1100px) {
		section {
			padding: 35px 300px;
		}
	}

	@media only screen and (max-width: 900px) {
		section {
			padding: 35px 200px;
		}
	}

	@media only screen and (max-width: 700px) {
		form {
			width: 300px;
		}
		section {
			padding: 35px 30px;
		}
	}

	@media only screen and (max-width: 400px) {
		form {
			width: 200px;
		}
		.feature > h2 {
			font-size: 20px;
		}
		.feature > ul {
			font-size: 16px;
		}
	}
	@media only screen and (max-width: 320px) {
		h1 {
			font-size: 34px;
		}
	}
</style>
