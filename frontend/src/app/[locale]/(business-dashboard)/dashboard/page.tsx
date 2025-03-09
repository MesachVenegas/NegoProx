"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
	return (
		<div className="flex-1 space-y-4 p-8 pt-6">
			<div className="flex items-center justify-between space-y-2">
				<h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
				<div className="flex items-center space-x-2">
					<Button>Download</Button>
				</div>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card className="p-4">
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-500">Total Revenue</p>
						<p className="text-2xl font-bold">$45,231.89</p>
					</div>
				</Card>
				<Card className="p-4">
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-500">Active Deals</p>
						<p className="text-2xl font-bold">24</p>
					</div>
				</Card>
				<Card className="p-4">
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-500">Pending Deals</p>
						<p className="text-2xl font-bold">12</p>
					</div>
				</Card>
				<Card className="p-4">
					<div className="space-y-2">
						<p className="text-sm font-medium text-gray-500">Completed Deals</p>
						<p className="text-2xl font-bold">36</p>
					</div>
				</Card>
			</div>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
				<Card className="col-span-4 p-6">
					<h3 className="text-xl font-semibold">Recent Activity</h3>
					<p className="text-sm text-gray-500 mt-2">
						No recent activity to display
					</p>
				</Card>
				<Card className="col-span-3 p-6">
					<h3 className="text-xl font-semibold">Quick Actions</h3>
					<div className="mt-4 space-y-2">
						<Button className="w-full">Create New Deal</Button>
						<Button className="w-full" variant="outline">
							View Reports
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
}
