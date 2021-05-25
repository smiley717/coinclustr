import React, { useEffect } from "react";
import { Empty, Tabs } from "antd";
import get from "lodash/get";

import { isEmpty } from "utils/common-utils";
import MiniWalletCard from "../../pages/Wallet/MiniWalletCard";

const { TabPane } = Tabs;

const WalletTabList = ({
  synchedWalletData,
  builtInWalletData,
  currentSelectedWalletData,
  onSelectWallet,
}) => {
  useEffect(() => {
    if (!isEmpty(builtInWalletData)) {
      onSelectWallet(get(builtInWalletData, "[0].walletId", ""));
    }
  }, [builtInWalletData, onSelectWallet]);

  return (
    <div>
      {synchedWalletData.length === 0 || builtInWalletData.length === 0 ? (
        <div>
          <div>
            {!isEmpty(synchedWalletData) &&
              synchedWalletData.map((item, index) => {
                const { walletId } = item;
                return (
                  <MiniWalletCard
                    isActive={currentSelectedWalletData === walletId}
                    data={item}
                    key={index}
                    handleClick={() => onSelectWallet(walletId)}
                  />
                );
              })}
          </div>
          <div>
            {!isEmpty(builtInWalletData) &&
              builtInWalletData.map((item, index) => {
                const { walletId } = item;
                return (
                  <MiniWalletCard
                    isActive={currentSelectedWalletData === walletId}
                    data={item}
                    key={index}
                    isBuiltIn={true}
                    handleClick={() => onSelectWallet(walletId)}
                  />
                );
              })}
          </div>
        </div>
      ) : (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Synched" key="synched">
            {!isEmpty(synchedWalletData) ? (
              synchedWalletData.map((item, index) => {
                const { walletId } = item;
                return (
                  <MiniWalletCard
                    isActive={currentSelectedWalletData === walletId}
                    data={item}
                    key={index}
                    handleClick={() => onSelectWallet(walletId)}
                  />
                );
              })
            ) : (
              <Empty />
            )}
          </TabPane>
          <TabPane tab="Builtin" key="builtin">
            {!isEmpty(builtInWalletData) ? (
              builtInWalletData.map((item, index) => {
                const { walletId } = item;
                return (
                  <MiniWalletCard
                    isActive={currentSelectedWalletData === walletId}
                    data={item}
                    key={index}
                    isBuiltIn={true}
                    handleClick={() => onSelectWallet(walletId)}
                  />
                );
              })
            ) : (
              <Empty />
            )}
          </TabPane>
        </Tabs>
      )}
    </div>
  );
};

export default WalletTabList;
