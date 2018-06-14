import * as React from 'react';
import styledComponents from 'styled-components';
import Monitor from './Monitor';

type Props = {
    className?: string;
};

const component: React.SFC<Props> = (props: Props) => {
    return (
        <div className={props.className}>
            <Monitor />
        </div>
    );
};

export default styledComponents(component)`
    height: 500vh;
`;
