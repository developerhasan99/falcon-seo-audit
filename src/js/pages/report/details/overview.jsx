import { twMerge } from "tailwind-merge";
import { Check, Circle, FolderTree, LockKeyhole, Scale, Square, Timer, Triangle } from "lucide-react";
import RadialProgress from "../../../components/radial-progress";
import Card from "../../../components/card";

export default function Overview({ details }) {

    return (
        <Card className="mb-8">
            <h3 className="px-6 py-4 font-semibold text-base border-b border-solid">Overview</h3>
            <div className="px-6 py-4 grid grid-cols-10 gap-8 items-center">
                <div className="col-span-2 relative">
                    <RadialProgress progress={90} />
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                        <span className="text-3xl font-bold border-b border-gray-300">90</span>
                        <span className="block text-sm">100</span>
                    </div>
                </div>
                <div className="col-span-5">
                    <h2 className="text-lg font-bold mb-3">
                        {details.title}
                    </h2>
                    <p className="text-base text-gray-600 mb-3">
                        {details.meta_description}
                    </p>
                    <a
                        href={details.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-base hover:underline newtab max-line-elips"
                    >
                        {details.url}
                    </a>
                </div>
                <div className="col-span-3">
                    {
                        details.psi_screenshot ? <img src={details.psi_screenshot} alt={details.title} /> : <div className="w-full h-40 bg-gray-200 flex items-center justify-center"><span>Screenshot not available!</span></div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-4 gap-8 px-6 py-2 border-t border-solid">
                <InsightProgressBar title="1 high issue" percentage="30%" className="bg-red-500" Icon={Triangle} iconClass="text-red-500" />
                <InsightProgressBar title="2 medium issue" percentage="30%" className="bg-yellow-500" Icon={Square} iconClass="text-yellow-500" />
                <InsightProgressBar title="3 low issue" percentage="30%" className="bg-gray-500" Icon={Circle} iconClass="text-gray-500" />
                <InsightProgressBar title="15 tests passed" percentage="30%" className="bg-green-500" Icon={Check} iconClass="text-green-500" />
            </div>
            <div className="grid grid-cols-4 gap-8 px-6 py-2 border-t border-solid">
                <PageInfoItem Icon={Timer} title={`${details.psi_speed_index} Seconds`} />
                <PageInfoItem Icon={Scale} title={`55.09 kB`} />
                <PageInfoItem Icon={FolderTree} title={`15 resources`} />
                <PageInfoItem Icon={LockKeyhole} title={`Secure`} />
            </div>
        </Card>
    )
}

function InsightProgressBar({ title, percentage, className, Icon, iconClass }) {
    return (
        <div className="py-2">
            <div className="flex justify-between mb-2 text-gray-600 text-sm">
                <div className="flex overflow-hidden text-ellipsis whitespace-nowrap items-center">
                    <Icon className={twMerge("flex-shrink-0 w-3 h-3 fill-current mr-2", iconClass)} />
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">{title}</div>
                </div>
                <div className="flex items-baseline ml-3 text-right">
                    <div className="w-12">
                        {percentage}
                    </div>
                </div>
            </div>

            <div className="flex overflow-hidden bg-gray-200 rounded text-xs leading-[0] h-[5px] w-100">
                <div className={twMerge("rounded", className)} role="progressbar" style={{ width: percentage }}></div>
            </div>
        </div>
    )
}

function PageInfoItem({Icon, title }) {
    return (
        <div className="flex gap-2 items-center py-2">
            <div className="p-2 bg-gray-200 rounded-lg">
                <Icon size={18} />
            </div>
            <div className="text-base">{title}</div>
        </div>
    )
}