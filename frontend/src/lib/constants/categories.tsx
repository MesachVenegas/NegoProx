import {
	BicepsFlexed,
	BookOpen,
	ChefHat,
	Cpu,
	HandHelping,
	Handshake,
	HeartPulse,
	Home,
	Sparkles,
	TicketsPlane,
	Users,
	Video,
} from "lucide-react";

export const categories = [
	{ name: "Health & Wellness", icon: <HeartPulse className="h-8 w-8" /> },
	{ name: "Beauty & Spa", icon: <Sparkles className="h-8 w-8" /> },
	{ name: "Food & Dining", icon: <ChefHat className="h-8 w-8" /> },
	{ name: "Professional Services", icon: <Users className="h-8 w-8" /> },
	{ name: "Home Services", icon: <Home className="h-8 w-8" /> },
	{ name: "Automotive", icon: <HandHelping className="h-8 w-8" /> },
	{ name: "Education", icon: <BookOpen className="h-8 w-8" /> },
	{ name: "Entertainment", icon: <Video className="h-8 w-8" /> },
	{ name: "Fitness", icon: <BicepsFlexed className="h-8 w-8" /> },
	{ name: "Retail", icon: <Handshake className="h-8 w-8" /> },
	{ name: "Technology", icon: <Cpu className="h-8 w-8" /> },
	{ name: "Travel", icon: <TicketsPlane className="h-8 w-8" /> },
];
