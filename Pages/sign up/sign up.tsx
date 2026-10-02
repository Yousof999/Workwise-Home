import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Account } from "../../appTypes";
import "./sign up.css";

interface SignUpForm extends Account {
	confirmPassword: string;
}

const accountStorageKey = "workwiseAccount";

export default function SignUpPage() {
	const navigate = useNavigate();
	const [formData, setFormData] = useState<SignUpForm>({ username: "", email: "", password: "", confirmPassword: "" });
	const [error, setError] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((current) => ({ ...current, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		localStorage.setItem(accountStorageKey, JSON.stringify({
			username: formData.username.trim(),
			email: formData.email.trim(),
			password: formData.password,
		}));
		navigate("/");
	};

	return (
		<main className="auth-page">
			<section className="auth-card">
				<p className="eyebrow">Join Workwise</p>
				<h1>Create account</h1>
				<p className="auth-subtitle">Create your account to start building your profile.</p>

				<form className="auth-form" onSubmit={handleSubmit}>
					<label>
						<span>Username</span>
						<input name="username" value={formData.username} onChange={handleChange} required />
					</label>
					<label>
						<span>Email</span>
						<input type="email" name="email" value={formData.email} onChange={handleChange} required />
					</label>
					<label>
						<span>Password</span>
						<input type="password" name="password" value={formData.password} onChange={handleChange} required />
					</label>
					<label>
						<span>Confirm password</span>
						<input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
					</label>
					{error && <p className="auth-error">{error}</p>}
					<button type="submit" className="btn btn--red auth-submit">Create account</button>
				</form>

				<p className="auth-switch">Already have an account? <Link to="/">Sign in</Link></p>
			</section>
		</main>
	);
}
