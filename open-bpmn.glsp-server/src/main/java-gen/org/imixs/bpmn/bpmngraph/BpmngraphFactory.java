/**
 */
package org.imixs.bpmn.bpmngraph;

import org.eclipse.emf.ecore.EFactory;

/**
 * <!-- begin-user-doc -->
 * The <b>Factory</b> for the model.
 * It provides a create method for each non-abstract class of the model.
 * <!-- end-user-doc -->
 * @see org.imixs.bpmn.bpmngraph.BpmngraphPackage
 * @generated
 */
public interface BpmngraphFactory extends EFactory {
    /**
     * The singleton instance of the factory.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @generated
     */
    BpmngraphFactory eINSTANCE = org.imixs.bpmn.bpmngraph.impl.BpmngraphFactoryImpl.init();

    /**
     * Returns a new object of class '<em>Base Element</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Base Element</em>'.
     * @generated
     */
    BaseElement createBaseElement();

    /**
     * Returns a new object of class '<em>Flow Element</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Flow Element</em>'.
     * @generated
     */
    FlowElement createFlowElement();

    /**
     * Returns a new object of class '<em>Task Node</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Task Node</em>'.
     * @generated
     */
    TaskNode createTaskNode();

    /**
     * Returns a new object of class '<em>Gateway Node</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Gateway Node</em>'.
     * @generated
     */
    GatewayNode createGatewayNode();

    /**
     * Returns a new object of class '<em>Event Node</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Event Node</em>'.
     * @generated
     */
    EventNode createEventNode();

    /**
     * Returns a new object of class '<em>Pool</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Pool</em>'.
     * @generated
     */
    Pool createPool();

    /**
     * Returns a new object of class '<em>Icon</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Icon</em>'.
     * @generated
     */
    Icon createIcon();

    /**
     * Returns a new object of class '<em>Symbol</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Symbol</em>'.
     * @generated
     */
    Symbol createSymbol();

    /**
     * Returns a new object of class '<em>Sequence Flow</em>'.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return a new object of class '<em>Sequence Flow</em>'.
     * @generated
     */
    SequenceFlow createSequenceFlow();

    /**
     * Returns the package supported by this factory.
     * <!-- begin-user-doc -->
     * <!-- end-user-doc -->
     * @return the package supported by this factory.
     * @generated
     */
    BpmngraphPackage getBpmngraphPackage();

} //BpmngraphFactory
