/**
 */
package org.openbpmn.di;

import org.openbpmn.dc.Bounds;

/**
 * <!-- begin-user-doc -->
 * A representation of the model object '<em><b>Label</b></em>'.
 * <!-- end-user-doc -->
 *
 * <p>
 * The following features are supported:
 * </p>
 * <ul>
 *   <li>{@link org.openbpmn.di.Label#getBounds <em>Bounds</em>}</li>
 * </ul>
 *
 * @see org.openbpmn.di.DiPackage#getLabel()
 * @model abstract="true"
 * @generated
 */
public interface Label extends Node {
    /**
     * Returns the value of the '<em><b>Bounds</b></em>' containment reference.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return the value of the '<em>Bounds</em>' containment reference.
     * @see #setBounds(Bounds)
     * @see org.openbpmn.di.DiPackage#getLabel_Bounds()
     * @model containment="true" ordered="false"
     * @generated
     */
    Bounds getBounds();

    /**
     * Sets the value of the '{@link org.openbpmn.di.Label#getBounds <em>Bounds</em>}' containment reference.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @param value the new value of the '<em>Bounds</em>' containment reference.
     * @see #getBounds()
     * @generated
     */
    void setBounds(Bounds value);

} // Label
