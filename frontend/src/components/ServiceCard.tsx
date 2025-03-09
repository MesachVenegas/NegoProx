"use client";
import { Button } from "./ui/button";
import { ServiceProps } from "@/types/business";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function ServiceCard({ service }: { service: ServiceProps }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{service.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground">{service.description}</p>
				<p className="font-semibold mt-2">{service.price}</p>
				<Button className="mt-4">Book Now</Button>
			</CardContent>
		</Card>
	);
}
