import type React from "react";
import { Fragment } from "react";
import { Link } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList as BreadcrumbListPrimitive, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

type BreadcrumbListProps = {
	items: BreadcrumbItemConfig[];
};

export const BreadcrumbList = ({ items }: BreadcrumbListProps): React.ReactElement => {
	return (
		<Breadcrumb>
			<BreadcrumbListPrimitive>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<Fragment key={`${item.label}-${index}`}>
							<BreadcrumbItem>
								{item.href ? (
									<Link to={item.href}>{item.label}</Link>
								) : (
									<BreadcrumbPage>{item.label}</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</Fragment>
					);
				})}
			</BreadcrumbListPrimitive>
		</Breadcrumb>
	);
};