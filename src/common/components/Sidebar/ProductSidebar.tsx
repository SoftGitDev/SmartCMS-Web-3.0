import React, { useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { productMenu } from './menus';


const ProductSidebar = () => {

    const [activeTab, setActiveTab] = useState<any>(null);

    return (
        <div>
            <div className="d-flex flex-column align-items-center gap-2 mainsidebar p-0"
            // onMouseEnter={() => sreenWidth >= 577 && setHovered(true)}
            // onMouseLeave={() => sreenWidth >= 577 && setHovered(false)}
            >
                <div className="pt-3 pb-2">
                    <img
                        src="./assets/images/logo/favicon.png"
                        width={40}
                        height={40}
                        alt=""
                    />
                </div>
                {productMenu?.map((item: any, i: number) => {
                    const { Icon } = item
                    return (
                        <OverlayTrigger
                            key={item.name}
                            placement="bottom"
                            overlay={<Tooltip>{item.name}</Tooltip>}
                        >
                            <div>
                                <div
                                    className={`cursor-pointer m-1 mainicon-wrapper p-2 ${activeTab === item.name
                                        ? `active activemainmenu-bg`
                                        : `mainmenu-bg`
                                        }`}
                                    onClick={() => {
                                        setActiveTab(item);
                                    }}
                                >
                                    <Icon className="mainsidebar-icon" />
                                </div>

                                {/* Show border if either ADMINISTRATION or MANAGE exists */}
                                {/* {item.name === borderItemName && (
                                <span className="border-mainmenusidebar"></span>
                            )} */}
                            </div>
                        </OverlayTrigger>

                    )
                })}
            </div>
        </div>
    )
}

export default ProductSidebar