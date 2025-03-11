export const business = {
	id: 10,
	name: `Business Name`,
	description:
		"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc eget aliquam. Vivamus id nunc nec nisl ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod, nunc eget aliquam. Vivamus id nunc nec nisl ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed euismod, nunc eget aliquam. Vivamus id nunc nec nisl ultricies. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae",
	rating: 4.5,
	reviews: 120,
	address: "123 Main St, Anytown, USA",
	phone: "(555) 123-4567",
	website: "www.businessName.com",
	hours: [
		{ day: "Monday", hours: "9:00 AM - 5:00 PM" },
		{ day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
		{ day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
		{ day: "Thursday", hours: "9:00 AM - 5:00 PM" },
		{ day: "Friday", hours: "9:00 AM - 5:00 PM" },
		{ day: "Saturday", hours: "10:00 AM - 3:00 PM" },
		{ day: "Sunday", hours: "Closed" },
	],
	services: [
		{
			id: 1,
			name: "Service 1",
			description: "Description of Service 1",
			price: "$50",
			date: "2023-01-15",
		},
		{
			id: 2,
			name: "Service 2",
			description: "Description of Service 2",
			price: "$75",
			date: "2023-02-20",
		},
		{
			id: 3,
			name: "Service 3",
			description: "Description of Service 3",
			price: "$100",
			date: "2023-03-25",
		},
		{
			id: 4,
			name: "Service 4",
			description: "Description of Service 4",
			price: "$60",
			date: "2023-04-30",
		},
		{
			id: 5,
			name: "Service 5",
			description: "Description of Service 5",
			price: "$90",
			date: "2023-05-05",
		},
	],
};

export const reviews = [
	{
		name: "John Doe",
		role: "Cliente Verificado",
		image: "/placeholder.svg?height=48&width=48&text=JD",
		review:
			"Excelente servicio, muy profesionales y puntuales. Totalmente recomendado.",
		rating: 5,
		colorAccent: "blue" as const,
	},
	{
		name: "Maria Garcia",
		role: "Cliente Verificado",
		image: "/placeholder.svg?height=48&width=48&text=MG",
		review: "La atención fue muy buena y el resultado superó mis expectativas.",
		rating: 4,
		colorAccent: "purple" as const,
	},
	{
		name: "Carlos Rodriguez",
		role: "Cliente Verificado",
		image: "/placeholder.svg?height=48&width=48&text=CR",
		review: "Muy satisfecho con el servicio, definitivamente volveré.",
		rating: 5,
		colorAccent: "green" as const,
	},
	// Add more reviews to have enough for the marquee
	{
		name: "Ana Martinez",
		role: "Cliente Frecuente",
		image: "/placeholder.svg?height=48&width=48&text=AM",
		review:
			"Siempre encuentro lo que necesito aquí. Excelente atención al cliente.",
		rating: 5,
		colorAccent: "blue" as const,
	},
	{
		name: "Luis Hernandez",
		role: "Nuevo Cliente",
		image: "/placeholder.svg?height=48&width=48&text=LH",
		review:
			"Primera vez que visito y quedé gratamente sorprendido. Volveré pronto.",
		rating: 4,
		colorAccent: "purple" as const,
	},
	{
		name: "Sofia Ramirez",
		role: "Cliente Verificado",
		image: "/placeholder.svg?height=48&width=48&text=SR",
		review: "Precios competitivos y excelente calidad. Altamente recomendado.",
		rating: 5,
		colorAccent: "green" as const,
	},
];
