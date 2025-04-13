import React, { ReactNode } from 'react'

type ActionButtonSubmenuComponentType = {
    subButtonTitle: string;
    onClickMethod: () => void;
}

export const ActionButtonSubmenuComponent = (props: ActionButtonSubmenuComponentType) => {
    return (
        <li><button className="dropdown-item" onClick={props.onClickMethod}>{props.subButtonTitle}</button></li>
    );
}

export const ActionButtonSubmenuDividerComponent = () => {
    return (
        <li><hr className="dropdown-divider" /></li>
    );
}

type ActionsButtonComponentProps = {
    buttonTitle: string;
    children: ReactNode;
}

const ActionsButtonComponent = (props: ActionsButtonComponentProps) => {
    return (
        <div className="btn-group m-0 p-0">
            <button type="button" className="actionKeepReturnOnListButton dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {props.buttonTitle}
            </button>
            <ul className="dropdown-menu">
                {props.children}
            </ul>
        </div>
    )
}

export default ActionsButtonComponent