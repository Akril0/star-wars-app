'use client'
import ReactFlow, {
    Background,
    Controls,
    Edge,
    Node
} from "reactflow";
import React from "react";
import 'reactflow/dist/style.css';

interface HeroFlowProps {
    nodes: Node[]
    edges: Edge[]
}

const HeroFlow: React.FC<HeroFlowProps> = (props) => {
    return (
        <div style={{height: '100%'}}>
            <ReactFlow nodes={props.nodes}
                       edges={props.edges} fitView>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
};

export default HeroFlow;
