/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
package org.openbpmn.glsp.elements.event;

import java.util.Optional;

import org.eclipse.glsp.graph.GPoint;
import org.eclipse.glsp.server.model.GModelState;
import org.openbpmn.glsp.utils.ModelTypes;

public class CreateThrowEventHandler extends AbstractCreateEventHandler {

    public CreateThrowEventHandler() {
        super(ModelTypes.THROW_EVENT, i -> "ThrowEvent" + i);
    }

    @Override
    public String getLabel() {
        return "Throw Event";
    }

    @Override
    public EventNodeBuilder builder(final Optional<GPoint> point, final GModelState modelState) {
        return super.builder(point, modelState);
    }
}
