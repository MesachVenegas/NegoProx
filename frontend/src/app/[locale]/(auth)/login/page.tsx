import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Login</CardTitle>
					<CardDescription className="text-center">
						Enter your email and password to login
					</CardDescription>
				</CardHeader>
				<CardContent></CardContent>
			</Card>
		</div>
	);
}
