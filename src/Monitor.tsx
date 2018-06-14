import * as React from 'react';
import styledComponents from 'styled-components';
import {
    compose,
    lifecycle,
    ReactLifeCycleFunctions,
    StateHandler,
    StateHandlerMap,
    StateUpdaters,
    withStateHandlers,
} from 'recompose';

type Outter = {
    className?: string;
};

type State = {
    scroll: number;
};

interface Updaters extends StateHandlerMap<State> {
    updateScroll: StateHandler<State>;
}

type Props = Outter & State & Updaters;

const scrollTop = (): number => {
    return Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop);
};

const component: React.SFC<Props> = (props: Props) => {
    return (
        <div className={props.className}>
            Scroll: {props.scroll.toString()}
        </div>
    );
};

const initProps: State = ({ scroll: scrollTop() });

const stateUpdaters: StateUpdaters<Outter, State, Updaters> = {
    updateScroll: (prev: State): StateHandler<State> => (
        (): Partial<State> => ({
            scroll: scrollTop(),
        })
    ),
};

const lifeCycleFunctions: ReactLifeCycleFunctions<Props, {}> = {
    componentDidMount() {
        window.addEventListener('scroll', this.props.updateScroll);
    },
    componentWillUnmount() {
        window.removeEventListener('scroll', this.props.updateScroll);
    },
};

const enhancedComponent = compose<Props, Outter>(
    withStateHandlers<State, Updaters, Outter>(initProps, stateUpdaters),
    lifecycle<Props, {}>(lifeCycleFunctions),
)(component);

export default styledComponents(enhancedComponent)`
    position: fixed;
    bottom: 10px;
    right: 10px;
    font-weight: bold;
`;
