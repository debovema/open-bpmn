/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import {
    configureDefaultModelElements,
    configureModelElement,
    ConsoleLogger,
    createClientContainer,
    DeleteElementContextMenuItemProvider,
    editLabelFeature,
    GridSnapper,
    LogLevel,
    overrideViewerOptions,
    RevealNamedElementActionProvider,
    RoundedCornerNodeView,
    SCompartment,
    SCompartmentView,
    SLabel,
    SLabelView,
    StructureCompartmentView,
    TYPES
} from '@eclipse-glsp/client';
// import { DefaultTypes } from '@eclipse-glsp/protocol';
import 'balloon-css/balloon.min.css';
import { Container, ContainerModule } from 'inversify';
import 'sprotty/css/edit-label.css';
import '../css/diagram.css';
import {
	GatewayNode,
	PoolNode,
	Icon,
	TaskNode,
	EventNode,
	SymbolSPort,
	SequenceFlow,
	BPMNSequenceFlowAnchor,
	BPMNElementAnchor,
	BPMNPolylineEventAnchor,
	BPMNEventElementAnchor,
	BPMNPort
} from '@open-bpmn/open-bpmn-model';
import { IconView, SymbolPortView, GatewayNodeView, EventNodeView } from './bpmn-element-views';
import { BPMNSequenceFlowView } from './bpmn-routing-views';

import {bpmnPropertyModule} from '@open-bpmn/open-bpmn-properties';

const bpmnDiagramModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(TYPES.ILogger).to(ConsoleLogger).inSingletonScope();
    rebind(TYPES.LogLevel).toConstantValue(LogLevel.warn);
    bind(TYPES.ISnapper).to(GridSnapper);
    bind(TYPES.ICommandPaletteActionProvider).to(RevealNamedElementActionProvider);
    bind(TYPES.IContextMenuItemProvider).to(DeleteElementContextMenuItemProvider);

    // bind the BPMN AnchorComputer
    bind(TYPES.IAnchorComputer).to(BPMNElementAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(BPMNSequenceFlowAnchor).inSingletonScope();

    bind(TYPES.IAnchorComputer).to(BPMNEventElementAnchor).inSingletonScope();
    bind(TYPES.IAnchorComputer).to(BPMNPolylineEventAnchor).inSingletonScope();

    const context = { bind, unbind, isBound, rebind };

    configureDefaultModelElements(context);
    configureModelElement(context, 'task:manual', TaskNode, RoundedCornerNodeView);
    configureModelElement(context, 'task:user', TaskNode, RoundedCornerNodeView);
    configureModelElement(context, 'task:send', TaskNode, RoundedCornerNodeView);
    configureModelElement(context, 'task:service', TaskNode, RoundedCornerNodeView);
    configureModelElement(context, 'task:script', TaskNode, RoundedCornerNodeView);

    configureModelElement(context, 'event:start', EventNode, EventNodeView);
    configureModelElement(context, 'event:end', EventNode, EventNodeView);

    configureModelElement(context, 'label:heading', SLabel, SLabelView, { enable: [editLabelFeature] });
    configureModelElement(context, 'comp:comp', SCompartment, SCompartmentView);
    configureModelElement(context, 'comp:header', SCompartment, SCompartmentView);
    // configureModelElement(context, 'label:icon', SLabel, SLabelView);
    configureModelElement(context, 'edge:sequenceflow', SequenceFlow, BPMNSequenceFlowView);
    configureModelElement(context, 'icon', Icon, IconView);
    configureModelElement(context, 'symbol', SymbolSPort, SymbolPortView);
    configureModelElement(context, 'port', BPMNPort, SymbolPortView);


    configureModelElement(context, 'gateway:exclusive', GatewayNode, GatewayNodeView);
    configureModelElement(context, 'gateway:inclusive', GatewayNode, GatewayNodeView);
    configureModelElement(context, 'gateway:parallel', GatewayNode, GatewayNodeView);
    configureModelElement(context, 'gateway:complex', GatewayNode, GatewayNodeView);

    configureModelElement(context, 'pool', PoolNode, RoundedCornerNodeView);
    configureModelElement(context, 'struct', SCompartment, StructureCompartmentView);

    // configureModelElement(context, DefaultTypes.PORT, CircularPort, CircularNodeView);

    // BPMN router?
  /*  bind(BPMNEdgeRouter).toSelf().inSingletonScope();
    bind(TYPES.IEdgeRouter).toService(BPMNEdgeRouter);*/

});

export default function createContainer(widgetId: string): Container {
    // add the BPMN propertyViewModule...
    // const container = createClientContainer(bpmnDiagramModule, directTaskEditor);
    // const container = createClientContainer(bpmnDiagramModule, directTaskEditor,bpmnPropertyModule);
    const container = createClientContainer(bpmnDiagramModule,bpmnPropertyModule);
    overrideViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}
