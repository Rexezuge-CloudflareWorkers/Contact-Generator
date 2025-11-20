import { useState, useEffect, useCallback } from 'react';

interface Contact {
	name?: string;
	email?: string;
	phone?: string;
	address?:
		| {
				street: string;
				city: string;
				state: string;
				zipCode: string;
				country: string;
		  }
		| string;
}

function App() {
	const [contact, setContact] = useState<Contact | null>(null);
	const [copyStates, setCopyStates] = useState<{ [key: string]: string }>({});
	const [includeEmail, setIncludeEmail] = useState(true);
	const [includePhone, setIncludePhone] = useState(true);
	const [includeAddress, setIncludeAddress] = useState(true);

	const fetchContact = useCallback(async () => {
		try {
			const params = new URLSearchParams({
				includeEmail: includeEmail.toString(),
				includePhone: includePhone.toString(),
				includeAddress: includeAddress.toString(),
			});

			const baseUrl = import.meta.env.VITE_OPTIONAL_BACKEND_URL || '';
			const response = await fetch(`${baseUrl}/api/contact?${params}`);
			const data = await response.json();
			setContact(data);
		} catch (error) {
			console.error('Error fetching contact:', error);
			setContact({ name: 'Error loading contact' });
		}
	}, [includeEmail, includePhone, includeAddress]);

	useEffect(() => {
		fetchContact();
	}, [fetchContact]);

	const copyToClipboard = (text: string, field: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopyStates((prev) => ({ ...prev, [field]: '✔' }));
			setTimeout(() => {
				setCopyStates((prev) => ({ ...prev, [field]: '📋' }));
			}, 2000);
		});
	};

	const formatAddress = (address: Contact['address']) => {
		if (typeof address === 'string') return address;
		if (!address) return '';
		return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
	};

	return (
		<div
			style={{
				padding: '20px',
				backgroundColor: '#f9fafb',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: '400px',
					padding: '24px',
					backgroundColor: 'white',
					border: '1px solid #d1d5db',
					borderRadius: '8px',
					boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
				}}
			>
				<h2
					style={{
						fontSize: '24px',
						fontWeight: 'bold',
						textAlign: 'center',
						marginBottom: '24px',
					}}
				>
					Contact Generator
				</h2>

				<div style={{ marginBottom: '24px' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '8px',
							fontWeight: '600',
							color: '#374151',
						}}
					>
						Generated Contact:
					</label>
					{contact ? (
						<div>
							{contact.name && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '8px 12px',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										backgroundColor: '#f3f4f6',
										marginBottom: '8px',
									}}
								>
									<span>
										<strong>Name:</strong> {contact.name}
									</span>
									<button
										onClick={() => copyToClipboard(contact.name!, 'name')}
										style={{
											fontSize: '16px',
											padding: '4px',
											borderRadius: '4px',
											border: 'none',
											backgroundColor: 'transparent',
											cursor: 'pointer',
										}}
									>
										{copyStates.name || '📋'}
									</button>
								</div>
							)}
							{contact.email && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '8px 12px',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										backgroundColor: '#f3f4f6',
										marginBottom: '8px',
									}}
								>
									<span>
										<strong>Email:</strong> {contact.email}
									</span>
									<button
										onClick={() => copyToClipboard(contact.email!, 'email')}
										style={{
											fontSize: '16px',
											padding: '4px',
											borderRadius: '4px',
											border: 'none',
											backgroundColor: 'transparent',
											cursor: 'pointer',
										}}
									>
										{copyStates.email || '📋'}
									</button>
								</div>
							)}
							{contact.phone && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '8px 12px',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										backgroundColor: '#f3f4f6',
										marginBottom: '8px',
									}}
								>
									<span>
										<strong>Phone:</strong> {contact.phone}
									</span>
									<button
										onClick={() => copyToClipboard(contact.phone!, 'phone')}
										style={{
											fontSize: '16px',
											padding: '4px',
											borderRadius: '4px',
											border: 'none',
											backgroundColor: 'transparent',
											cursor: 'pointer',
										}}
									>
										{copyStates.phone || '📋'}
									</button>
								</div>
							)}
							{contact.address && (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '8px 12px',
										border: '1px solid #d1d5db',
										borderRadius: '6px',
										backgroundColor: '#f3f4f6',
									}}
								>
									<span>
										<strong>Address:</strong> {formatAddress(contact.address)}
									</span>
									<button
										onClick={() =>
											copyToClipboard(formatAddress(contact.address), 'address')
										}
										style={{
											fontSize: '16px',
											padding: '4px',
											borderRadius: '4px',
											border: 'none',
											backgroundColor: 'transparent',
											cursor: 'pointer',
										}}
									>
										{copyStates.address || '📋'}
									</button>
								</div>
							)}
						</div>
					) : (
						<div
							style={{
								padding: '12px',
								border: '1px solid #d1d5db',
								borderRadius: '6px',
								backgroundColor: '#f3f4f6',
							}}
						>
							Loading...
						</div>
					)}
				</div>

				<button
					onClick={fetchContact}
					style={{
						width: '100%',
						marginBottom: '24px',
						padding: '8px 16px',
						backgroundColor: '#2563eb',
						color: 'white',
						borderRadius: '6px',
						border: 'none',
						cursor: 'pointer',
					}}
				>
					Generate New Contact
				</button>

				<div style={{ marginBottom: '16px' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '8px',
							fontWeight: '600',
							color: '#374151',
						}}
					>
						<input
							type="checkbox"
							checked={includeEmail}
							onChange={(e) => setIncludeEmail(e.target.checked)}
							style={{ marginRight: '8px' }}
						/>
						Include Email
					</label>
				</div>

				<div style={{ marginBottom: '16px' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '8px',
							fontWeight: '600',
							color: '#374151',
						}}
					>
						<input
							type="checkbox"
							checked={includePhone}
							onChange={(e) => setIncludePhone(e.target.checked)}
							style={{ marginRight: '8px' }}
						/>
						Include Phone
					</label>
				</div>

				<div style={{ marginBottom: '16px' }}>
					<label
						style={{
							display: 'block',
							marginBottom: '8px',
							fontWeight: '600',
							color: '#374151',
						}}
					>
						<input
							type="checkbox"
							checked={includeAddress}
							onChange={(e) => setIncludeAddress(e.target.checked)}
							style={{ marginRight: '8px' }}
						/>
						Include Address
					</label>
				</div>
			</div>
		</div>
	);
}

export default App;
